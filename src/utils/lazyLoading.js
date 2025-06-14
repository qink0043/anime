export function lazyLoading(container = document.body) {
  const imgs = container.querySelectorAll('img')
  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target
        img.src = img.dataset.src
        io.unobserve(img)
      }
    })
  })
  imgs.forEach((img) => {
    io.observe(img)
  })
}