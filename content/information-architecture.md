---
layout: post
title: '📝 Everyday Information Architecture'
date: 2019-05-13
tags: [information architecture, ux]
slug: '/information-architecture'
type: post
---

## Introduction

[Everyday Information Architecture](https://everydayia.com/), written by [Lisa Maria Martin (LMM)](https://thefutureislikepie.com/), starts off by explaining how constraints make things easier to find. When you are designing how your information is structured in your website, you need constraints to work within.

This book breaks down how we define and evaluate different constraints for our data.

> "The creative organization of information creates new information" - Richard Saul Wurman

The internet craves your data!

## Systems of organization

> Information may be infinite but the way we structure it is not. - Richard Saul Wurman

There are 5 common methods of organizing information summed up in one acronym: LATCH.

- Location
- Alphabet
- Time
- Category
- Hierarchy

### Location

Location is an somewhat obvious way to organize things. LMM uses Ikea as an example. They organize different items by what room you would put them in: bedroom, kitchen, etc. On Ikea's website, they ask the user where they are from and structure the site based of that users local mental model of what makes up a home. This will be different for a Japanese user as it would be for an American.

### Alphabet

Organizing things by alphabet is as old a books. It is the quickest way to find a single known item in a long list.

Alphabetical organization is not great for "discoverability". Alphabetizing is for research.

### Time

The most basic examples of time based categorization is messages and social media (although social media is leaning towards algorithm based ordering 🙄).

The time a piece of content was published can change the way a user perceives it.

This seems definitely true for people looking for technical tutorials. They always ask for a date when its not there.

### Category

This is organization around topics. This is one of the most popular organization methods on the web. "organizing by tag". An IRL example would be a grocery store. All veggies are together, all meat together, canned goods, etc.

Categorical organization is better for "discoverability".

### Hierarchy

Organization according to value.

On the web, one way to do this is organizing by "most popular". An IRL example would be for yarn, organizing it from lightest to heaviest.

Hierarchy of a sitemap is not hierarchical organization.

### It's Subjective

LATCH has a lot of subjectivity. How do you determine what goes in a category? What makes something more popular than another thing? Why does an item belong in a certain location. These things can change in different contexts.

Ordering methods: alphabet time, location.
Grouping methods: category and hierarchy.

Organization is never arbitrary. They way you organize information can hurt your users.

## Content Analysis

There are a bunch of content analysis questions you can ask to determine the nature of the content you are organizing.

Content needs to be advocated for. Each site has a unique set of content that can't be organized until its understood.

A tool for understanding your content is performing an audit. An audit is a _process_ where the result, an inventory of content, is a product.

> The action of reviewing a website; an inventory is the artifact that results from the audit.

For an audit to be useful, you need to know whats prompting the audit.

Determining the scope of the audit is important:

1. How much content is on the site?
2. What kind of content is it?
3. How is the site structured?
4. How effective is the content?
5. How is the content managed?

What type of content is it?

Is your content evergreen vs dynamic? Is it marketing focused? Selling a product or service? Is there story telling content (articles, blog posts, interviews)? Is the content research based? Is there a lot of support content or documentation? Is there a forum or bulletin board? What kind of rich media is there?

How is the site structured?

- Is it easy to navigate, or do you get lost quickly?
- Do the URLs match the expected paths?
- Are there breadcrumbs and other wayfinding features?
- Are any areas duplicated or missing from the menus?
- Can you easily understand the relationships between pages?
- Are pages with similar content constructed the same way?
- Does content flow logically on each page?
- Do things generally work the way you expect them to?

LMM gives some advice on working with automated crawl spreadsheet data. Be sure to style the spread sheet so the header has a different color heading size. Delete/hide the unnecessary columns. Remove duplicate entries. Add section data.

Section data is labeling a section. So course pages would be labeled with Course and lesson pages would be labeled with Lesson etc.

The relative page count can tell you where the company prioritizes content.

## Categories and Labels

The web is fraught with structural blindness. Categorizing content is the first step to structuring a site. How do we categorize if its a subjective task?

### Criteria Matching

In essence, group like things together. Determining "like" is the process of drawing boundaries.

There are two questions to inform you on this:

1. What are the criteria for the category?
2. Does the content match the criteria?

How do all the pieces fit together?

For egghead, we have courses. These are our bread and butter. These courses are made up of lessons that direct the user in the stated goals of the course. Courses are sorted by primary technology they are teaching. Right now, we organize these technologies in there "context" buckets. Our predefined definition of the utility of the technology: Libraries, Frameworks, Languages, Tools, Platforms. These contexts don't really help the user understand what is inside of them.

### Categorical Considerations

We don't want to make criteria on a whim. There are 4 key factors that LMM goes over:

1. The needs of the users
2. The goals of the business
3. The current state of the content
4. The strategic future of the content

#### Needs of the users

Who is on the site? What are they trying to accomplish?

egghead member are on the site trying to learn a technology. There are many reasons that a member would be on the site. Trying to level up their career, working on a side project, building a blog, trying to break into the Tech industry, learning a technology for a job.

Often we try to categorize by what type of user is on a site. People don't come to a website to categorize themselves. They do so to **do** something. Users aren't confident in what category they will fit into. They might belong to more than on category.

> Focus on users actions, rather than their personas
> Organizing around the customer means organizing around the task that they want to complete. It’s not about products. It’s not even about services. If I’m an old person in the wintertime, I want to keep warm. My task is to get warm, not to get services.

#### Goals of the business

> The main sections of a site are just as much a part of the experience as the colors, layout, and content. To group pages without considering the narrative— well, you might as well use your org chart as your navigation.

What is the business trying to accomplish?

We want to fight against Conway’s Law—organizations that design systems will reproduce their communication structures as those systems—not give in to it.

#### Current state of the content

- a good yardstick for predicting future content,
- full of brand equity (companies rarely want to destroy what they’ve already put years of effort into)
- all you’ve got, anyway.

Use boardthing.com or trello.com to put the different parts of the site into their current categories.

#### Strategic future of the content

> That something may suggest that new content needs to be created, that the current content needs to be rewritten, that the content needs to be reshuffled and relabeled, or some combination of all three.

Two components to the future of content:

- strategy that's driving the design
- resources for content creation and maintenance

### Crafting Labels

Labels grow up in tandem with your categories. They are part of your criteria-matching process.

You most likely wont get your labels correct the first time.

Create it.
Test it.
Tweak it.

There are 4 qualities of a good label:

1. Clarity
2. Specificity
3. Inclusively
4. Consistency

## Site structure

This chapter has a lot of nitty gritty instructors on how to build out a site map structure.

The main points:

- use consistent page identification
- differentiate between single pages and collections
- dont forget outliers
- aim for editorial accuracy
- add context

## Navigation and Way Finding

The **global navigation** is the key structure that accesses your important content. You'll want to keep this "main menu" in mind when categorizing and labeling.

At egghead, this is courses and lessons.

**Secondary navigation** is leads to content that is considered secondary. Usually this content plays a support role. "About us" or "News page".

At egghead, this is podcasts, articles, tags, helpscout docs.

**Utility navigation** leads to logins, account sign ups, and account information. In many sites secondary and utility navigation are the same.

**Social navigation** are the social icons that link to the companies social media. Its important to be aware of major links that navigate away from the site.

**Header and footer navigation** refer to the top and bottom of a page. Header areas usually hold the secondary or utility navigation. Footers repeat the main navigation along with a list of child pages or a curated list of inferior pages. Footers can be used to highlight certain content without distracting the main navigation.

**Known Item Seeking** is when a user knows what they are looking for. They just don't know where to find it.

**Exploratory seeking** is the flip side of known item seeking. It is searching without a specific intent or looking for something new to watch or article to read. This happens when someone is conducting research.

## Tags and Taxonomies

> Taxonomy is how we arrange things.

How do you know if you even need a taxonomy for your website?

- Will you have multiple authors and editors publishing and managing content? (And, in the unlikely event that you have only one author or editor, is it possible they will one day take a vacation?)
- Will some portion of the publishing process be automated? Will particular pieces of content be automatically displayed in particular areas of the site, or affiliated with particular topics?
- Will your site’s search functionality include any kind of filtering or faceting? Will users control any kind of filtering or faceting as they browse content?

> If you have a style guide that lists controlled terms, you may be able to use it as a starting point for developing a controlled vocabulary specific to your content. Such a guide can be helpful when creating labels and categories, ensuring that terms are consistent with other user touchpoints.

Building a styleguide:

1. write down your terms
2. get input from others to make sure its accurate
3. write how the guide will be enforced

Tags are content and connection.

Tags are streamlined into controlled vocabulary.

How to build a taxonomy: page 111.
