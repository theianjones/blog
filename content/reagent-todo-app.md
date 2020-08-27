---
title: Reagent Todo App
tags: [clojure, react, reagent]
---


### Table of Contents

1.  [defonce](/reagent-todo-app#org56023a4)
2.  [local component state](/reagent-todo-app#orgbf38790)
3.  [Updating state on input change](/reagent-todo-app#org1a9d961)
4.  [Use app-db](/reagent-todo-app#org107ed8b)
5.  [Deploying to heroku](/reagent-todo-app#orgd51f80e)


I used the `lein reagent` default project to get this up and running. I used defaults, so this project uses `figwheel` for updating code. [Link to Github Repo](https://github.com/theianjones/reagent-todo) 


## defonce

When you are defining an `reagent/atom` and you dont want your state to reset after every file update, you can use `defonce` to ensure the atom is only created once:

    (defonce app-db (atom {:filter :all
                           :todos [
                                   {:id 1 :text "Learn Reagent" :state :todo}
                                   {:id 2 :text "Learn Hiccup" :state :todo}]}))


<a id="orgbf38790"></a>

## local component state

When you have local component state, you use `let` to bind those values. You need to be sure to use a `reagent/atom` if you want react to rerender you code when that atom updates.

Also, you need to return a new function when creating local state. In this example, you can see that I have `init-todo` to initialize the input.

    (defn todo-text-input [init-todo]
      (let [!display-input (atom true)
            !input (atom (:text init-todo))]
        (fn [todo]
          [:div {:on-double-click #(reset! !display-input (not @!display-input))}
           (if @!display-input [:div (:text todo)]
               [:input {:type "text"
                        :value @!input
                        :on-change #(reset! !input (-> % .-target .-value))
                        :on-key-press (fn [e]
                                        (cond
                                          (= (-> e .-key) "Enter") (do (update-todo (:id todo)
                                                                                :text
                                                                                @!input)
                                                                    (reset! !display-input (not @!display-input)))))}])])))

I also am recieving `todo` in the inner function. This was a gotcha for me: the argument for the outer function wont recieve updates on rerender, you have to use the inner function argmuents.

I was editing the todo, saving the atom and the list item would still have the old value:

![img](https://res.cloudinary.com/dzsq0psas/image/upload/v1598544212/blog/input-bug.gif)


<a id="org1a9d961"></a>

## Updating state on input change

I wanted to get the input of an element when I typed into it. At first I thought I needed a ref, but it turns out I just needed a `reagent/atom` and use a controlled input with that atom.

I would update the atom with `:on-change` handler.

    (defn add-todo []
      (let [!input (atom (str))]
        (fn []
          [:div
           [:input {:type "text"
                    :value @!input
                    :on-change #(reset! !input (-> % .-target .-value))}]
           [:button {:on-click (fn []
                                  (conj-new-todo @!input)
                                  (reset! !input (str)))}
            "Add Todo"]])))

We use `reset!` to update the state of the atom. We use the `thread first` macro `->` to help us grab the input. If we didnt use this macro we&rsquo;d have to write the function like this:

    #(reset! !input (-> % .-target .-value))
    ;; vs
    #(reset! !input (.-value (.-target %)))

This reads much more clearly in english.


<a id="org107ed8b"></a>

## Use app-db

At first I was just using an atom for `todos`. And then I wanted to add filtering logic. I refactored this atom to contain:

    {:filter :all :todos []}

In retrospect, I could have just used two atoms and not had to refacter all my calls to `@todos` but I think using a single atom for your app is more in line with `re-frame` or `datascript`.


<a id="orgd51f80e"></a>

## Deploying to heroku

This was really easy!

    heroku create
    git push heroku master

You can view the app [here](https://rocky-brook-98624.herokuapp.com/).

