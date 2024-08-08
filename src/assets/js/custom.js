// Carga de imagenes

// document.addEventListener('DOMContentLoaded', function () {
//     function lazyLoadImages() {
//         let lazyImages = document.querySelectorAll('img.lazy');
//         let lazyImageObserver = new IntersectionObserver(function (entries, observer) {
//             entries.forEach(function (entry) {
//                 if (entry.isIntersecting) {
//                     let lazyImage = entry.target;
//                     lazyImage.src = lazyImage.dataset.src;
//                     lazyImage.classList.remove('lazy');
//                     lazyImage.classList.add('loaded');
//                     lazyImageObserver.unobserve(lazyImage);
//                     console.log('loaded');
//                 }
//             });
//         });

//         lazyImages.forEach(function (lazyImage) {
//             lazyImageObserver.observe(lazyImage);
//         });
//     }

//     lazyLoadImages();

//     document.addEventListener('livewire:update', function () {
//         lazyLoadImages();
//     });
// });