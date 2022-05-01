/**
 * 
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 * 
 * Dependencies: None
 * 
 * JS Version: ES2015/ES6
 * 
 * JS Standard: ESlint
 * 
*/

/**
 * Comments should be present at the beginning of each procedure and class.
 * Great to have comments before crucial code sections within the procedure.
*/

/**
 * Define Global Variables
 * 
*/

let numb_updateActiveClass = 0; //counter to measure how many time the updateActiveClass function is run.
let total_time_ActiveClass = 0; //counter measuring the total time running the updateActiveClass function.
const sections_list = document.querySelectorAll('section'); //list of <section> elements in the DOM
let offset = 0; //measures the height on window of the viewport at coordinate (0,0). Will be useful when scrolling to specific sections.

/**
 * End Global Variables
 * Start Helper Functions
 * 
*/

/* This function takes in the list of sections and returns the string of the closest one
from the top left of the screen. This is how we identify the active section on the page.*/
function section_viewed (sec_list) {
    let sec_ref = document.body.scrollHeight; /* height of the webpage */
    let viewed_sec = ''; //string with the name of the current active section. 
    for (const section of sec_list) {
        const sec_view = section.getBoundingClientRect();
        if (Math.abs(sec_view.top) < sec_ref) {
            sec_ref = Math.abs(sec_view.top);
            viewed_sec = section.getAttribute('data-nav');
        }
    }
    return viewed_sec;
}


/* This function is called following a scrolling event to update the appearance of the active class*/
function updateActiveClass(){

    const t0 = performance.now();
    const currentActiveElement = document.querySelector('.your-active-class');
    const viewed_sec = section_viewed(sections_list);

    if (currentActiveElement.getAttribute('data-nav') !== viewed_sec){
        currentActiveElement.classList.remove('your-active-class');

        for (const section of sections_list) {
            if (section.getAttribute('data-nav') === viewed_sec) {
                section.classList.add('your-active-class');
            }       
        }
    }
    const t1 = performance.now();

    total_time_ActiveClass += (t1-t0); //measuring the total time spent running the function.
    numb_updateActiveClass++; //our counter measuring the number of times we ran the function. 
}


/*This function is called when user clicks on nav bar to get to a specific section */
function scroll_to_section(event){
    
    event.preventDefault();
    const section_id = event.target.textContent; 

    const section_to_scroll = document.getElementById(section_id.split(' ').join('').toLowerCase());
    const sec_position = section_to_scroll.getBoundingClientRect();
    
    let scroll_position = sec_position.top + offset; //adding the value of offset to sec_position.
    offset = scroll_position;

    window.scrollTo({
        top:scroll_position,
        left:0,
        behavior:'smooth'
    });
}


function updateActiveNavTab(event){
    const section_nav = event.target;
    const active_nav = document.querySelector('.active__navtab');

    if (active_nav){
        active_nav.classList.remove('active__navtab');
    }

    section_nav.classList.add('active__navtab');
}
/**
 * End Helper Functions
 * Begin Main Functions
 * 
*/

// build the nav

const navbar = document.getElementById('navbar__list');
const navbar_fragment = document.createDocumentFragment();

for (let i=0; i<sections_list.length; i++) {

    const nav_item = document.createElement('li'); //creating new list element
    const section_numb = sections_list[i].getAttribute('data-nav');

    nav_item.innerHTML = '<a href=' + '#' + `${section_numb.split(' ').join('').toLowerCase()} class="menu__link">${section_numb}</a>`;
//    nav_item.innerHTML = '<a href=' + '#' + `${section_numb.split(' ').join('').toLowerCase()} class="menu__link active__navtab">${section_numb}</a>`;
    //attaching an addEventListener to new list element created that will be in nav tab to be able to directly scroll to it. 
    nav_item.addEventListener('click',function(e){
        scroll_to_section(e);
        updateActiveNavTab(e);
    });

    navbar_fragment.appendChild(nav_item);
};

navbar.appendChild(navbar_fragment);


// Add class 'active' to section when near top of viewport

let exec_func = true; //using boolean to reduce the number of times we call updateActiveClass()

// We add setTimeout to reduce the number of times updateActiveClass() is being executed.
window.addEventListener('scroll', function(){
    if (exec_func){
        updateActiveClass();
        exec_func = false;
    } else {
        setTimeout(function(){
            exec_func = true;
        }, 150);
    }
    offset = window.scrollY; // recalibrate offset value.
});

// Scroll to anchor ID using scrollTO event -> cf. scroll_to_section()

/**
 * End Main Functions
 * Begin Events
 * 
*/

// Build menu 

// Scroll to section on link click

// Set sections as active


