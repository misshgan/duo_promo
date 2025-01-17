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

function handleMobileNav() {
    const openTarget = document.querySelector('.js-menu-open');
    const closeTarget = document.querySelector('.js-menu-close');
    const mobileMenu = document.querySelector('.js-mobile-nav');

    if (!openTarget || !closeTarget || !mobileMenu) { 
        console.error("Close target, open target or mobile menu container wasn't found"); 
        return; 
    }

    const mobileMenuContent = mobileMenu.querySelector('.mobile-nav__content');

    const catchClickAndClose = (e) => {
        if (!mobileMenuContent.contains(e.target)) {
            closeMenu();
        }
    };

    openTarget.addEventListener('click', () => {
        mobileMenu.classList.add('active');
        openTarget.classList.add('hidden');
        closeTarget.classList.remove('hidden');
        document.body.classList.add('no-scroll');

        setTimeout(() => {
            document.addEventListener('click', catchClickAndClose);
        }, 100);
    });

    closeTarget.addEventListener('click', closeMenu);

    function closeMenu() {
        mobileMenu.classList.remove('active');
        openTarget.classList.remove('hidden');
        closeTarget.classList.add('hidden');
        document.body.classList.remove('no-scroll');
        document.removeEventListener('click', catchClickAndClose);
    }
}

function handleSubmenu() {
    const target = document.querySelector('.js-submenu');

    if (!target) { return; }

    target.addEventListener('click', (event) => {
        event.stopPropagation();
        target.classList.toggle('active');
    });

    document.addEventListener('click', (event) => {
        if (!target.classList.contains('active')) return;

        const isClickInside = target.contains(event.target);
        if (!isClickInside) {
            target.classList.remove('active');
        }
    });
}

function handleMobileDropdown() {
    const target = document.querySelector('.js-mobile-dropdown-target');

    if (!target) { return; }

    target.addEventListener('click', () => {
        target.classList.toggle('active')
    })
}



window.addEventListener('DOMContentLoaded', () => {
    handleReviewsFilter();
    handleFaqItemsOpen();
    handleMobileNav();
    handleSubmenu();
    handleMobileDropdown();
})