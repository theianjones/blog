---
slug: factory-bot-build-stubbed
date: 2019-10-02
title: "Fast Ruby Test's with FactoryBot#build_stubbed"
description: 'build_stubbed allows you to create fast tests because everything is handled in memory with less database hits.'
tags: ['ruby', 'rspec', 'rails', 'factory bot']
published: true
author: 'Ian Jones'
type: post
---

`FactoryBot#build_stubbed` allows you to make faster test with less time in the
database. This is paired with rspec's `allow(Model).to receive(:method)` for some
really nice flexibility.

Say you have an `Instructor` model that `has_one :user`. Where the `User has_one :primary_contact`.

For a contrived example, lets say we want to make sure that when we call `CongratulateInstructorWorker`
we send an email to the instructor. This email is kicked off by a sidekiq worker so that's
what we will test.

This worker simply fetches the course that was published and then sends out an
email to the instructor.

```ruby
class CongratulateInstructorWorker
  include Sidekiq::Worker

  def perform(course_id)
    ActiveRecord::Base.connection_pool.with_connection do
      @course = Course.find(course_id)
      InstructorMailer.send_congrats(@course.instructor_id).deliver_now
  end
end
```

This `InstructorMailer` grabs the `instructor#email` and sends a message to that email.

```ruby
class InstructorMailer < ApplicationMailer
    include Rails.application.routes.url_helpers
    def send_congrats(instructor_id)
      @instructor = Instructor.find(instructor_id)

      unless @instructor.email
        return
      end

      mail(to: @instructor.email , from: 'Ian <ian@ianjones.us>', subject: "Congratulations on Your Course Release 🥳")
    end
end
```

We can mock all of this out with `FactoryBot#build_stubbed` and rspecs `allow(Model).to receive(:method)`.

```ruby
# worker test
RSpec.describe CongratulateInstructorWorker do
  let(:instructor) { FactoryBot.build_stubbed(:instructor) }
  let(:course) {FactoryBot.build_stubbed(:course)}
  before do
    allow(Course).to receive(:find).and_return(course)
    allow(course).to receive(:instructor_id).and_return(instructor.id)
    allow(InstructorMailer).to receive_message_chain(:send_congrats, :deliver_now)
  end

  it 'sends email and slack message' do
    expect(InstructorMailer).to receive(:send_congrats).with(course.id)

    subject.perform(course.id)
  end
end
```

This may not increase the speed of this single test by a huge margin, but over the
course of 1000 tests, it makes a significant difference.
