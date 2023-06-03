export const transformStoryblokImg = (img, param = '') => {
  return img.replace('a.storyblok.com', `img2.storyblok.com/${param}`)
}

export const formatBlogDate = (date) => {
  const newDate = new Date(date)
  const options = {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }
  const formattedDate = newDate.toLocaleDateString('en-US', options)

  return formattedDate
}
