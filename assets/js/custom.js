(function () {
    function verifyAuthorInfoColor(checkElm, modElm) {
        if (window.scrollY > checkElm.clientHeight - 30) {
            modElm.classList.remove("white");
        }
        else {
            modElm.classList.add("white");
        }
    }

    window.addEventListener('DOMContentLoaded', function () {
        const authorInfoElm = document.querySelector(".authorinfo");
        const headerImageElm = document.querySelector('header.image.singlepost');

        document.querySelectorAll('.postcontent a').forEach(a => {
            if (!a.getAttribute('href').startsWith('#')) {
                a.setAttribute('target', '_blank');
            }
        });

        // Check if the authorinfo text has to be changed back to black/white
        if (authorInfoElm && headerImageElm) {
            verifyAuthorInfoColor(headerImageElm, authorInfoElm);
            window.addEventListener('scroll', verifyAuthorInfoColor.bind(this, headerImageElm, authorInfoElm));
        }

        if (document.querySelector('.postlist') && authorInfoElm) {
            authorInfoElm.classList.remove('white');
        }
    });
})();