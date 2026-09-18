const dot = document.getElementById('dot');
const score = document.getElementById('score');
const clickSound = new Audio('buttonclickred.mp3.mp3');

    let startTime = 0;

    function showDot() {
      const dotSize = dot.offsetWidth || 50;
      // Keep dot away from edges and UI
      const padding = 20;
      const minY = 100;// below header and instructions
      const maxX = window.innerWidth - dotSize - padding;
      const maxY = window.innerHeight - dotSize - padding;

      const x = Math.random() * (maxX - padding) + padding;
      const y = Math.random() * (maxY - minY) + minY;

      dot.style.left = `${x}px`;
      dot.style.top = `${y}px`;
      dot.style.display = 'block';
      startTime = Date.now();
    }

    function hideDot() {
      dot.style.display = 'none';
    }

    dot.addEventListener('click', () => {
      const reactionTime = Date.now() - startTime;
      score.textContent = `Your reaction time is: ${reactionTime} ms`;
      hideDot();

      // Send score to backend
      fetch('http://localhost:3000/score', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ reactionTime })
      });
    });

    document.body.addEventListener('click', (e) => {
      // Only restart if dot is hidden and not clicking on header or dot
      if (
        e.target !== dot &&
        !e.target.closest('.header') &&
        dot.style.display === 'none'
      ) {
        score.textContent = 'Click the red dot as fast as you can!';
        showDot();
      }
    });

    showDot(1000);

    document.body.onselectstart = () => false;
