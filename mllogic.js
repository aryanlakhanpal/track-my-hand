 let video;
    let handPose;
    let hands = [];
    let painting;
    let px, py;

    function preload() {
      handPose = ml5.handPose({ flipped:false});
    }

    function gotHands(results) {
      hands = results;
    }

    function setup() {
      // Create main canvas and offscreen painting canvas
      let canvas = createCanvas(windowWidth * 0.7, windowHeight * 0.7); // Main canvas size based on window size
      canvas.parent('canvas-container'); // Attach canvas to a container div

      painting = createGraphics(windowWidth * 0.7, windowHeight * 0.7); // Off-screen canvas for drawing
      painting.clear(); // Clear initial canvas

      // Create the video capture and hide the video element
      video = createCapture(VIDEO, () => {
        video.size(width, height); // Resize video to match the canvas size
        video.hide(); // Hide video element (it will be drawn on the canvas)
      });

      // Start handpose detection
      handPose.detectStart(video, gotHands);
    }

    function draw() {
    //   background(0, 0, 0, 50); // Apply a semi-transparent background

      // Display the video on the canvas as the background
      image(video, 0, 0);

      // Handle the hand pose and drawing
      if (hands.length > 0) {
        let hand = hands[0];

        // Define finger positions
        let index = hand.index_finger_tip;
        let middle = hand.middle_finger_tip;
        let ring = hand.ring_finger_tip;
        let pinky = hand.pinky_finger_tip;
        let thumb = hand.thumb_tip;

        //! index finger ki details
        let x1 = (index.x + thumb.x) * 0.5;
        let y1 = (index.y + thumb.y) * 0.5;
        let dis1 = dist(index.x, index.y, thumb.x, thumb.y);
        if (dis1 < 15) {
          
          painting.stroke(255, 70, 0);
          painting.strokeWeight(11);
          painting.line(px, py, x1, y1);
          px = x1;
          py = y1;
        }

        //! Middle Finger ki details
        let x2 = (middle.x + thumb.x) * 0.5;
        let y2 = (middle.y + thumb.y) * 0.5;
        let dis2 = dist(middle.x, middle.y, thumb.x, thumb.y);
        if (dis2 < 15) {
            painting.stroke(255, 255, 0);
          painting.strokeWeight(11);
          painting.line(px, py, x2, y2);
          px = x2;
          py = y2;
        }

        // Ring Finger ki details
        let x3 = (ring.x + thumb.x) * 0.5;
        let y3 = (ring.y + thumb.y) * 0.5;
        let dis3 = dist(ring.x, ring.y, thumb.x, thumb.y);
        if (dis3 < 15) {
          painting.stroke(255, 255, 255);
          painting.strokeWeight(11);
          painting.line(px, py, x3, y3);
          px = x3;
          py = y3;
        }

        // Pinky Finger ki details
        let x4 = (pinky.x + thumb.x) * 0.5;
        let y4 = (pinky.y + thumb.y) * 0.5;
        let dis4 = dist(pinky.x, pinky.y, thumb.x, thumb.y);
        if (dis4 < 15) {
          painting.stroke(8, 255, 24);
          painting.strokeWeight(11);
          painting.line(px, py, x4, y4);
          px = x4;
          py = y4;
        }

        if (dis1 < 30 && dis2<30) {
          painting.clear();
        }
      }
      image(painting, 0, 0);
    }

    // Resize canvas when window is resized
    window.addEventListener('resize', () => {
      resizeCanvas(windowWidth * 0.7, windowHeight * 0.7);
    });
