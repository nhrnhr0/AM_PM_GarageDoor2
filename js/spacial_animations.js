function scroll_to_first_form() {
  console.log('scroll_to_first_form');
  window.smoothScroll(document.getElementById('scroll_1_target'));
}

function scroll_to_secound_form() {
  window.smoothScroll(document.getElementById('secound_form'));
}


window.smoothScroll = function (target) {
  var scrollContainer = target;
  do { //find scroll container
    scrollContainer = scrollContainer.parentNode;
    if (!scrollContainer) return;
    scrollContainer.scrollTop += 1;
  } while (scrollContainer.scrollTop == 0);

  var targetY = 0;
  do { //find the top of target relatively to the container
    if (target == scrollContainer) break;
    targetY += target.offsetTop;
  } while (target = target.offsetParent);

  scroll = function (c, a, b, i) {
    i++;
    if (i > 30) return;
    c.scrollTop = a + (b - a) / 30 * i;
    setTimeout(function () {
      scroll(c, a, b, i);
    }, 20);
  }
  // start scrolling
  scroll(scrollContainer, scrollContainer.scrollTop, targetY, 0);
}


var counter = document.getElementById("counters");
var counterHeight = counter.clientHeight;

var redpen = document.getElementById("redpen");
const RED_PEN_DELAY = 1500;

function scroll_listener() {
  animateCountersListener();
  animateRedPenListenr();
}

function isInViewport(el) {
  const rect = el.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)

  );
}
var is_redpen_active = false;

function animateRedPenListenr() {
  var is_in_view = isInViewport(redpen);
  if (is_redpen_active == false && is_in_view) {
    is_redpen_active = true;
    setTimeout(() => {
      redpen.classList.add('active');
    }, RED_PEN_DELAY);
  } else if (is_in_view == false) {
    is_redpen_active = false;
    redpen.classList.remove('active');
  }
}

// animate counters when it is in view
var is_animation_started = false;

function animateCountersListener() {
  // is element in view?
  if (isInViewport(counter)) {
    // element is in view, add class to element
    counter.classList.add('animate');
    if (is_animation_started == false) {
      is_animation_started = true;
      counterDivs = document.querySelectorAll('.num');

      for (var i = 0; i < counterDivs.length; i++) {
        var coutDom = counterDivs[i];
        console.log(coutDom);
        var render_time = Math.min(Math.max(coutDom.dataset.num, 1000), 2000) + Math.random() * 2000;
        animateCounters(counterDivs[i], 0, coutDom.dataset.num, render_time);
      }
    }
  }
}



function animateCounters(obj, initVal, lastVal, duration) {

  let startTime = null;

  //get the current timestamp and assign it to the currentTime variable
  let currentTime = Date.now();

  //pass the current timestamp to the step function
  const step = (currentTime) => {

    //if the start time is null, assign the current time to startTime
    if (!startTime) {
      startTime = currentTime;
    }

    //calculate the value to be used in calculating the number to be displayed
    const progress = Math.min((currentTime - startTime) / duration, 1);

    //calculate what to be displayed using the value gotten above
    var html = Math.floor(progress * (lastVal - initVal) + initVal);
    var commas = html.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    obj.innerHTML = commas;

    //checking to make sure the counter does not exceed the last value (lastVal)
    if (progress < 1) {
      window.requestAnimationFrame(step);
    } else {
      window.cancelAnimationFrame(window.requestAnimationFrame(step));
    }
  };

  //start animating
  window.requestAnimationFrame(step);
}
document.addEventListener('scroll', scroll_listener);