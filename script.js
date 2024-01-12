document.addEventListener("DOMContentLoaded", function () {
  console.log("Hello It's my portfolio.");

  // ====== change background header ======
  function scrollHeader() {
    const nav = document.getElementById("mobile-header");
    if (this.scrollY >= 100) {
      nav.classList.add('scroll-header');
    } else {
      nav.classList.remove('scroll-header');
      nav.style.transition = '0.3s';
    }
  }
  window.addEventListener('scroll', scrollHeader);

  // active nav link:
  const items = document.querySelectorAll(".active-nav .hoverLink");
  const mobile_items = document.querySelectorAll(".nav_item .nav_link");
  items.forEach((item) => {
    item.addEventListener('click', () => {
      document.querySelector(".hoverLink.main-active").classList.remove('main-active');
      item.classList.add('main-active');
    })
  })

  mobile_items.forEach((item) => {
    item.addEventListener('click', () => {
      document.querySelector(".nav_link.active-link").classList.remove('active-link');
      item.classList.add('active-link');
    })
  })

  const sections = document.querySelectorAll('section');
  const navLinks = document.querySelectorAll('.nav_menu ul li a');

  window.onscroll = () => {
    const fromTop = window.scrollY;

    navLinks.forEach(link => {
      const section = document.querySelector(link.getAttribute('href'));

      if (
        section &&
        section.offsetTop <= fromTop &&
        section.offsetTop + section.offsetHeight > fromTop
      ) {
        link.classList.add('main-active');
      } else {
        link.classList.remove('main-active');
      }
    });
  };

  // scroll-up:
  var scrollUpButton = document.querySelector('.scroll-up');

  scrollUpButton.style.transform = 'translateX(150%)';

  window.addEventListener('scroll', function () {
    if (window.scrollY > 100) {
      scrollUpButton.style.transform = 'translateX(0%)';
    } else {
      scrollUpButton.style.transform = 'translateX(150%)';
    }
  });

  scrollUpButton.addEventListener('click', function () {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  //typing text 
  const texts = [
    'Frontend Developer',
    'Web Developer',
    'React Developer'
  ];

  const textSpan = document.getElementById('text-span');
  let currentIndex = 0;

  function rotateText() {
    const textElement = document.createElement('div');
    textElement.classList.add('rotate-text');
    textElement.textContent = texts[currentIndex];

    textSpan.innerHTML = '';
    textSpan.appendChild(textElement);

    // Move to the next text in the array
    currentIndex = (currentIndex + 1) % texts.length;

    // Restart the animation for the next text
    setTimeout(rotateText, 2000);
  }

  // Start the rotation
  rotateText();

  //Form Validation:
  let sendButton = document.getElementById("sendBtn");
  sendButton.addEventListener('click', validateForm);

  function validateForm(event) {
    event.preventDefault();
    var fullNameInput = document.getElementById('fullName');
    var emailInput = document.getElementById('email');
    var subjectInput = document.getElementById('subject');
    var commentInput = document.getElementById('comment');

    var fullName = fullNameInput ? fullNameInput.value : "";
    var email = emailInput ? emailInput.value : "";
    var subject = subjectInput ? subjectInput.value : "";
    var comment = commentInput ? commentInput.value : "";

    document.getElementById('fullNameError').innerText = "";
    document.getElementById('emailError').innerText = "";
    document.getElementById('subjectError').innerText = "";
    document.getElementById('commentError').innerText = "";

    var fullNameValue = fullName.trim();
    var emailValue = email.trim();
    var subjectValue = subject.trim();
    var commentValue = comment.trim();

    if (fullNameValue === "") {
      document.getElementById('fullNameError').innerText = "Full Name is required";
      document.getElementById('fullNameError').style.opacity = "1";
      // return false;
    } else {
      document.getElementById('fullNameError').style.opacity = "0";
    }

   // Validate Email
var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
if (emailValue === "") {
    document.getElementById('emailError').innerText = "Email is required";
    document.getElementById('emailError').style.opacity = "1";
} else if(!emailRegex.test(emailValue)) {
  document.getElementById('emailError').innerText = "Invalid email address";
    document.getElementById('emailError').style.opacity = "1";
}
 else {
    document.getElementById('emailError').style.opacity = "0";
}


    // Validate Subject
    if (subjectValue === "") {
      document.getElementById('subjectError').innerText = "Subject is required";
      document.getElementById('subjectError').style.opacity = "1";
      // return false;
    } else {
      document.getElementById('subjectError').style.opacity = "0";
    }

    // Validate Comment
    if (commentValue === "") {
      document.getElementById('commentError').innerText = "Comment is required";
      document.getElementById('commentError').style.opacity = "1";
      // return false;
    } else {
      document.getElementById('commentError').style.opacity = "0";
    }

    if (fullNameValue !== "" && emailValue !== "" && emailRegex.test(emailValue) && subjectValue !== "" && commentValue !== "") {
      const scriptURL = 'https://script.google.com/macros/s/AKfycbyKg43loiBuCma-aaQyD2H1Ix_AOiYq37bZmFzG7wKxNIw_A-PCUYKcN93AIP3w-YcW/exec';
      const form = document.forms['submit-to-google-sheet'];
      const success = document.getElementById('success');
      
      success.innerHTML = "Message sent successfully";
      fetch(scriptURL, { method: 'POST', body: new FormData(form) })
        .then(response => {
          setTimeout(function () {
            success.innerHTML = '';
          }, 5000);
          form.reset();
        })
        .catch(error => {
          console.error('Error!', error.message);
        });
    }
  }

  // projects:
  function fetchProjects() {
    fetch('projects.json')
      .then(response => response.json())
      .then(data => {
        data.Projects.forEach(project => {
          let mySwiper = document.getElementById('mySwiper');

          let swiperSlide = document.createElement('swiper-slide');
          mySwiper.appendChild(swiperSlide);
          
          let projectImage = document.createElement('img');
          projectImage.src = project.coverimage;
          swiperSlide.appendChild(projectImage);

          let projectName = document.createElement('h3');
          projectName.textContent  = project.Project_Name;
          swiperSlide.appendChild(projectName);

          let links = document.createElement('div');
          links.classList.add('link');
          swiperSlide.appendChild(links);

          let git = document.createElement('div');
          git.classList.add('git');
          links.appendChild(git);
          let anchor = document.createElement('a');
          anchor.setAttribute('href', project.Git_link);
          git.appendChild(anchor);
          let gitImage = document.createElement('img');
          gitImage.classList.add('linkImg');
          gitImage.src = project.git;
          anchor.appendChild(gitImage);

          let netlify = document.createElement('div');
          netlify.classList.add('netlify');
          links.appendChild(netlify);
          let netAnchor = document.createElement('a');
          netAnchor.setAttribute('href', project.Netlify_link);
          netlify.appendChild(netAnchor);
          let netlifyImage = document.createElement('img');
          netlifyImage.classList.add('linkImg');
          netlifyImage.src = project.netlify;
          netAnchor.appendChild(netlifyImage);

          gitImage.addEventListener("click",(event)=>{
        
            if(project.Git_link == ""){
                event.preventDefault();
                alert("This Project still in Progress")
            } 
        })

          netlifyImage.addEventListener("click",(event)=>{
            if(project.Netlify_link == ""){
                event.preventDefault();
                alert("This Project still in Progress")
            } 
        })
        })
        console.log(data);
      })
  }
  fetchProjects();
});