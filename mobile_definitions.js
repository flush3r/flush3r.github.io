document.addEventListener("DOMContentLoaded", () => {
  const word = document.getElementById('daria-alert');
  
  if (word) {
    const isTouchDevice = window.matchMedia("(pointer: coarse)").matches || 
                          ('ontouchstart' in window);

    word.addEventListener('click', function(e) {
      if (isTouchDevice) {
        e.preventDefault();
        alert(this.title);
      }
    });
  }
});

document.addEventListener("DOMContentLoaded", () => {
  const word = document.getElementById('dnb-alert');
  
  if (word) {
    const isTouchDevice = window.matchMedia("(pointer: coarse)").matches || 
                          ('ontouchstart' in window);

    word.addEventListener('click', function(e) {
      if (isTouchDevice) {
        e.preventDefault();
        alert(this.title);
      }
    });
  }
});
