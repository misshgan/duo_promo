function handleReviewsFilter() {
    const filterItems = document.querySelectorAll('.js-review-filter-item');
    const reviewsBody = document.querySelector('.js-reviews')

    if (filterItems.length < 1 || !reviewsBody) { return; }

    filterItems.forEach(item => {
        item.addEventListener('click', () => {
            filterItems.forEach(item => { item.parentElement.classList.remove('active') });
            reviewsBody.setAttribute('data-active-group-number', item.getAttribute('data-item-number'))
            item.parentElement.classList.add('active');
        })
    })
}

function handleFaqItemsOpen() {
    const faqItemHeaders = document.querySelectorAll('.js-faq-item h3');

    if (faqItemHeaders.length < 1) { return; }

    faqItemHeaders.forEach(item => {
        item.addEventListener('click', () => { item.classList.toggle('active') })
    })
}

window.addEventListener('DOMContentLoaded', () => {
    handleReviewsFilter();
    handleFaqItemsOpen();
})