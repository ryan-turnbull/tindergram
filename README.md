# Tindergram 🔥

The refinement tool for your creative vision

[👉 You can try the app live here 👈](https://tindergram.vercel.app/)

## Getting started

Make sure you have a recent version of Node installed.

```
node --version ## Ensure v20+
```

Install dependencies

```
yarn
```

Generate styles. Tailwind will scrape your application, creating a CSS file with all classes that have been used, and purging the rest. This is useful to have running during your development.

```
yarn styles
```

Finally, run the application.

```
yarn dev
```

# Exercise notes

Thank you for reviewing my application! I thought I'd leave some notes here explaining my thinking, and general approach to the problem.

### Solution

When thinking about an approach for this task, I wanted to keep it focused on the problem

> Imagine you are a designer trying to understand your client’s taste. What if there was “Tinder for design aesthetics” to help them communicate their preferences?

A few things stuck out as important here.

- Being able to search for a keyword, and be shown responses, so that users can find content
- Being able to like/unlike photos so that users can communicate their preferences
- Having visibility over all my liked photos, so the designer can have a broad view of what the user liked

I went for a basic application that could facilitate these things. There is a basic home page, which has the search & like functionality - and if you click on any image, you'll get more of a Tinder-like experience as mentioned in the brief.

My approach definitely leaned toward being more functional

**Is there anything I didn't do?**
Haha yes - requirement 3, as it didn't feel like a great UX.

> Allow the user to swipe right for good, left for bad

I implemented a basic pan gesture handler, but on a laptop, you had to click - drag - and release, which is much more cumbersome than the natural thumb action on mobile. I assumed (using web-based tech) I should optimise for the experience on desktop, but ran out of time to get something more robust/magic-al

**How would I build recommendations?**

> Imagine you want to repopulate the list of candidate images based on how users had already swiped, i.e. more images similar to the likes, and less similar to the dislikes.
> A pseudocode/explanation of how you’d solve will get some bonus marks too. The actual working code would be very impressive.

This is the part I'd need the most help with, as it's not my forte. As I mentioned below, storing liked images on the backend against a user/account is an important first step. Now whether you'd be pulling from those likes each request, training a model against those images, or relying on Pexels to do this for you, I'm not sure. The code would vary significantly per approach

```js
// This is all happening in the backend
const onPhotoLike = async (photo: Photo, ctx: Context) => {
  const entry = await db.insert('photo', photo)

  await ctx.models.photos.addData(ctx.userId, {
    likedPhotoId: entry.id
 })

  return photo
}

const getResultsForQuery = async (query: string, ctx: Context) => {
  const userPreference = await ctx.models.photos.getPreferenceForUser(ctx.userId)
  const resp = await pexelsClient.photos.search({
    query,
 })

  return await ctx.models.photos.filter({
    target: resp.photos,
    filter: userPreference
 })
}
```

### Code

- I kept the scaffold of my application fairly basic, but following patterns I've used in the past. This was somewhat of a time sink, it's important to get right.
- I reached for a component library, NextUI, to implement simple Button & TextInput. It's super flexible to extend, even though I used the stock styling in the time given.
- Used a context provider for all the data storage

**Future extensions**

- All of the logic I've got in that `data/photos.tsx` I'd likely move to the backend. Actions like liking photos, and storing categories/search history, could all be facilitated by storing this in a database of sorts, and have that be well unit tested. You'll notice if you refresh the page at any point, all the data is lost, sad face
- Swiping _could_ be brought back, as well as key binds, for ease of use. Some experimentation here for sure.
- Get the pagination working properly. You can uncommit the code within `search-results.tsx` and see the issue I was facing. I validated the offset was correctly being parsed through, but Pexels just didn't interpret it
- The ENV vars i've committed to github would be moved into your CI pipeline, and be validated during the build (or even at runtime)
- Stylistically, this is how i'd structure my application. I didn't lean too heavily into re-use, prop drilling etc. because that's easier to do later when there are multiple valid use cases.

I hope you enjoy playing around! I timed this, and it came in ~3 hours 45 minutes, not including time spent on the submission / README.
