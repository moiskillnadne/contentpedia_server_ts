export function formatterToPreviewLink(videoId: string) {
  return `http://i1.ytimg.com/vi/${videoId}/maxresdefault.jpg`
}

export function getVideoIDFromUrl(videoUrl: string) {
  return videoUrl.replace('https://www.youtube.com/watch?v=', '').replace('https://youtu.be/', '')
}
