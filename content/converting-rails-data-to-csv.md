---
layout: post
slug: '/converting-rails-data-to-csv'
title: Using Rails Console To Turn Data Into a CSV
date: 2017-09-10 11:02:21
published: true
tags: [rails, csv]
author: Ian Jones
description: ''
type: post
---

Say you have data in a Rails [4.2.8] postgres [9.6] database that you need to turn into a [CSV](https://en.wikipedia.org/wiki/Comma-separated_values). Rails makes it super easy to extract data through rails console.

First we want to start the console up.

`rails c`

Next we want to get all of the objects that we want to operate on. Say that we have a Lesson object that has these attributes:

`Lesson(id: integer, title: string, youtube_id: string, summary: text, duration: integer, gist_url: text)`

Say we want to get all of the lessons where the `gist_url` is not `nil?` or `empty?`.

With rails model helpers, thats super simple:

`lessons = Lesson.where.not('gist_url' => nil, 'gist_url' => '')`

Now that we have all the lessons we want to extract data from, lets extract some data.

```ruby
require 'csv'

# I used the rails public folder for convinience.
file = "#{Rails.root}/public/data.csv"

lessons = Lesson.where.not('gist_url' => nil, 'gist_url' => '')

CSV.open( file, 'w' ) do |writer|
    lessons.each do |l|
    writer << [l.id, l.title, l.gist_url]
    end
end
```

Now you'll have a CSV file in your `/public` folder named `data.csv`.

Lets say you already have a CSV file that you want to access from the Rails console.

Heres how you load the CSV into memory:

```ruby
require 'csv' # not required if you already did this
csv_text = File.read("#{Rails.root}/public/data.csv")
csv = CSV.parse(csv_text, :headers => true)

csv.each do |row|
    # do some work
end
```

Row will be an array of the values that are in that row. You're CSV had `[id, title, gist_url]` you could access id with `row[0]`, title with `row[1]` and gist_url with `row[2]` ect.
