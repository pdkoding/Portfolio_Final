var page1To2 = document.getElementById('between1To2')
var page2To3 = document.getElementById('between2To3')


function ScrollHandler(pageId) {
    var page = document.getElementById(pageId)
    var pageStart = page.offsetTop
    var pageJump = false
    var viewStart
    var duration = 1000
    var scrolled = document.getElementById('scroll')
    function scrollToPage() {
        pageJump = true

        var startLocation = viewStart
        var endLocation = pageStart
        var distance = endLocation - startLocation

        var runAnimation

        var timeLapsed = 0
        var percentage, position

        var easing = function (progress) {
            return progress < 0.5 ? 4 * progress * progress * progress : (progress - 1) * (2 * progress - 2) * (2 * progress - 2) + 1
        }

        function stopAnimationIfRequired(pos) {
            if (pos === endLocation) {
                cancelAnimationFrame(runAnimation)
                setTimeout(function() {
                    pageJump = false
                }, 500)
            }
        }

        var animate = function () {
            timeLapsed += 16
            percentage = timeLapsed / duration
            if (percentage > 1) {
                percentage = 1
                position = endLocation
            } else {
                position = startLocation + distance * easing(percentage)
            }
            scrolled.scrollTop = position
            runAnimation = requestAnimationFrame(animate)
            stopAnimationIfRequired(position)
        }
        runAnimation = requestAnimationFrame(animate)
    }

    function lol() {
        viewStart = scrolled.scrollTop
        if (!pageJump) {
            var pageHeight = page.scrollHeight
            var pageStopPortion = pageHeight / 2
            var viewHeight = window.innerHeight

            var viewEnd = viewStart + viewHeight
            var pageStartPart = viewEnd - pageStart
            var pageEndPart = (pageStart + pageHeight) - viewStart

            var canJumpDown = pageStartPart >= 0
            var stopJumpDown = pageStartPart > pageStopPortion

            var canJumpUp = pageEndPart >= 0
            var stopJumpUp = pageEndPart > pageStopPortion
            window.addEventListener('wheel', function(event) {
                return scrollingForward = event.deltaY > 0
            })
            if (  ( scrollingForward && canJumpDown && !stopJumpDown)
                || (!scrollingForward && canJumpUp   && !stopJumpUp)) {
                scrollToPage()
            } false
        }
    } lol()
}

window.addEventListener('wheel', function(e) {
    if (e.deltaY < 0) {
        console.log('scrolling up');
        if (checkIfElemIsInViewport(page1To2) === true) {
            new ScrollHandler('page1')
        }
        if (checkIfElemIsInViewport(page2To3) === true) {
            new ScrollHandler('page2')
        }
    }
    if (e.deltaY > 0) {
        console.log('scrolling down');
        if (checkIfElemIsInViewport(page1To2) === true) {
            new ScrollHandler('page2')
        }
        if (checkIfElemIsInViewport(page2To3) === true) {
            new ScrollHandler('page3')
        }
    }
})

function checkIfElemIsInViewport(elem) {
    var bounding = elem.getBoundingClientRect();
    if (
        bounding.top >= 0 &&
        bounding.left >= 0 &&
        bounding.right <= (window.innerWidth || document.documentElement.clientWidth) &&
        bounding.bottom <= (window.innerHeight || document.documentElement.clientHeight)
    ) {
        // console.log('In the viewport!');
        return true

    } else {
        // console.log('Not in the viewport... whomp whomp');
        return false
    }
}