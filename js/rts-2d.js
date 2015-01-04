function build_robot() {

    if (money[0] < 100) {
        return;
    }

    money[0] -= 100;

    p0_units.push([
      p0_buildings[selected_id][0] + p0_buildings[selected_id][2] / 2,// X
      p0_buildings[selected_id][1] + p0_buildings[selected_id][3] / 2,// Y
      0,// Selected?
      p0_buildings[selected_id][6] != null ?
			p0_buildings[selected_id][6] :
			p0_buildings[0][0],// Destination X
      p0_buildings[selected_id][7] != null ?
			p0_buildings[selected_id][7] :
			p0_buildings[0][1],// Destination Y
      0,// Weapon reload
      100,// Health
	  false,// Moving?
    ]);
}

// TODO: Improve clarity.
function draw() {
	// what to draw?
    // Draw world static on screen
    // Draw p1 building on screen
    // Draw p0 building on screen
    // Draw p1 unit on screen
    // Draw p0 unit on screen
    // Draw bullets.
    // Draw fog.
    // Draw building destination.
    // Draw unit destination and range.
    // Draw range circle.
    // Draw selection box.
    // Draw building while in build mode.
    // Draw minimap frame.
    // Draw player 0 money.
    // Draw minimap background.
    // Draw player 1 buildings on minimap.
    // Draw player 0 buildings on minimap.
    // Draw player 1 units on minimap.
    // Draw player 0 units on minimap.
    // Draw fog of war on minimap.
    // Draw building destination on minimap.
    // Draw unit destination and range on minimap.
    // Draw range circle.
    // Draw selection box on minimap.
    // Draw camera boundaries on minimap.
    // draw win/lose text if win/lose conditions met


	draw_frame_count += 1;
	if (debug_flag && draw_frame_count % 80 === 0) {
		//console.log("frame count", draw_frame_count);
		console.log("(x,y)", x, y);
		console.log("(c_x,c_y)", camera_x, camera_y);
	}

    buffer.clearRect(
      0,
      0,
      width,
      height
    );

    var offset_x = x + camera_x;
    var offset_y = y + camera_y;
    buffer.translate(
      offset_x,
      offset_y
    );

    var loop_counter = world_static.length - 1;
    if (loop_counter >= 0) {
        do {
            // Draw world static on screen
            if (world_static[loop_counter][0] +
				world_static[loop_counter][2] + offset_x <= 0
				|| world_static[loop_counter][0] + offset_x >= width
				|| world_static[loop_counter][1] +
				world_static[loop_counter][3] + offset_y <= 0
				|| world_static[loop_counter][1] + offset_y >= height) {
                continue;
            }

            buffer.fillStyle = world_static[loop_counter][4];
            buffer.fillRect(
              world_static[loop_counter][0],
              world_static[loop_counter][1],
              world_static[loop_counter][2],
              world_static[loop_counter][3]
            );
        } while(loop_counter--);
    }

    buffer.font = '42pt sans-serif';
    buffer.textBaseline = 'middle';
    buffer.textAlign = 'center';

    loop_counter = p1_buildings.length - 1;
    if (loop_counter >= 0) {
        do {
            // Draw p1 building on screen
            if (p1_buildings[loop_counter][0] +
				p1_buildings[loop_counter][2] +
				offset_x <= 0
				|| p1_buildings[loop_counter][0] + offset_x >= width
				|| p1_buildings[loop_counter][1] +
				p1_buildings[loop_counter][3] + offset_y <= 0
				|| p1_buildings[loop_counter][1] + offset_y >= height) {
                continue;
            }

            buffer.fillStyle = '#600';
            buffer.fillRect(
              p1_buildings[loop_counter][0],
              p1_buildings[loop_counter][1],
              p1_buildings[loop_counter][2],
              p1_buildings[loop_counter][3]
            );
            buffer.fillStyle = '#0f0';
            buffer.fillRect(
              p1_buildings[loop_counter][0],
              p1_buildings[loop_counter][1] - 10,
              p1_buildings[loop_counter][2] *
					(p1_buildings[loop_counter][4] / 1000),
              5
            );

            // Temporarily draw building name.
            buffer.fillStyle = '#fff';
            buffer.fillText(
              [
                'HQ',
                'F',
              ][p1_buildings[loop_counter][5] - 1],
              p1_buildings[loop_counter][0] + 50,
              p1_buildings[loop_counter][1] + 50
            );
        } while(loop_counter--);
    }

    buffer.strokeStyle = '#ddd';
    loop_counter = p0_buildings.length - 1;
    if (loop_counter >= 0) {
        do {
            // Draw p0 building on screen
            if (p0_buildings[loop_counter][0] +
				p0_buildings[loop_counter][2] +
				offset_x <= 0
				|| p0_buildings[loop_counter][0] + offset_x >= width
				|| p0_buildings[loop_counter][1] +
				p0_buildings[loop_counter][3] +
				offset_y <= 0
				|| p0_buildings[loop_counter][1] + offset_y >= height) {
                continue;
            }

            buffer.fillStyle = p0_buildings[loop_counter][5] ?
				'#1f1' : '#060';
            buffer.fillRect(
				p0_buildings[loop_counter][0],
				p0_buildings[loop_counter][1],
				p0_buildings[loop_counter][2],
				p0_buildings[loop_counter][3]
            );
            buffer.fillStyle = '#0f0';
            buffer.fillRect(
				p0_buildings[loop_counter][0],
				p0_buildings[loop_counter][1] - 10,
				p0_buildings[loop_counter][2] *
					(p0_buildings[loop_counter][4] / 1000),
              5
            );

            // Temporarily draw building name.
            buffer.fillStyle = '#fff';
            buffer.fillText(
              [
                'HQ',
                'F',
              ][p0_buildings[loop_counter][8] - 1],
              p0_buildings[loop_counter][0] + 50,
              p0_buildings[loop_counter][1] + 50
            );
        } while(loop_counter--);
    }

    loop_counter = p1_units.length - 1;
    if (loop_counter >= 0) {
        do {
            // Draw p1 unit on screen
            if (p1_units[loop_counter][0] + 15 + x + camera_x <= 0
              || p1_units[loop_counter][0] - 15 + x + camera_x >= width
              || p1_units[loop_counter][1] + 15 + y + camera_y <= 0
              || p1_units[loop_counter][1] - 15 + y + camera_y >= height) {
                continue;
            }

            buffer.fillStyle = '#b00';
            buffer.fillRect(
              p1_units[loop_counter][0] - 15,
              p1_units[loop_counter][1] - 15,
              30,
              30
            );
            buffer.fillStyle = '#0f0';
            buffer.fillRect(
              p1_units[loop_counter][0] - 15,
              p1_units[loop_counter][1] - 25,
              30 * (p1_units[loop_counter][5] / 100),
              5
            );
        } while(loop_counter--);
    }

    loop_counter = p0_units.length - 1;
    if (loop_counter >= 0) {
        do {
            // Draw p0 unit on screen
            if (p0_units[loop_counter][0] + 15 + x + camera_x <= 0
              || p0_units[loop_counter][0] - 15 + x + camera_x >= width
              || p0_units[loop_counter][1] + 15 + y + camera_y <= 0
              || p0_units[loop_counter][1] - 15 + y + camera_y >= height) {
                continue;
            }

            buffer.fillStyle = p0_units[loop_counter][2] ? '#1f1' : '#0b0';
            buffer.fillRect(
              p0_units[loop_counter][0] - 15,
              p0_units[loop_counter][1] - 15,
              30,
              30
            );

			if (heavy_debug_flag) {
				console.log("p0 unit",
							loop_counter,
							p0_units[loop_counter][0],
							p0_units[loop_counter][1]);
			}

            buffer.fillStyle = '#0f0';
            buffer.fillRect(
              p0_units[loop_counter][0] - 15,
              p0_units[loop_counter][1] - 25,
              30 * (p0_units[loop_counter][6] / 100),
              5
            );
        } while(loop_counter--);
    }

    loop_counter = bullets.length - 1;
    if (loop_counter >= 0) {
        // Draw bullets.
        do {
            // Set bullet color to team color.
            buffer.fillStyle = bullets[loop_counter][4] ?
				'#f00' :
				'#0f0';

            buffer.fillRect(
              bullets[loop_counter][0] - 5,
              bullets[loop_counter][1] - 5,
              10,
              10
            );
        } while(loop_counter--);
    }

    // Draw fog.
    buffer.fillStyle = '#000';
    loop_counter = fog.length - 1;
    if (loop_counter >= 0) {
        do {
            buffer.fillRect(
              -settings['level-size'] + fog[loop_counter][0],
              -settings['level-size'] + fog[loop_counter][1],
              100,
              100
            );
        } while(loop_counter--);
    }

    // Draw building destination.
    loop_counter = p0_buildings.length - 1;
    if (loop_counter >= 0) {
        do {
            if (p0_buildings[loop_counter][5] && p0_buildings[loop_counter][6] != null) {
                buffer.beginPath();
                buffer.moveTo(
                  p0_buildings[loop_counter][0] + p0_buildings[loop_counter][2] / 2,
                  p0_buildings[loop_counter][1] + p0_buildings[loop_counter][2] / 2
                );
                buffer.lineTo(
                  p0_buildings[loop_counter][6],
                  p0_buildings[loop_counter][7]
                );
                buffer.closePath();
                buffer.stroke();
            }
        } while(loop_counter--);
    }

    // Draw unit destination and range.
    loop_counter = p0_units.length - 1;
    if (loop_counter >= 0) {
        do {
            if (p0_units[loop_counter][2]) {
                // If not yet reached destination, draw destination line.
                if (p0_units[loop_counter][0] != p0_units[loop_counter][3]
                  || p0_units[loop_counter][1] != p0_units[loop_counter][4]) {
                    buffer.beginPath();
                    buffer.moveTo(
                      p0_units[loop_counter][0],
                      p0_units[loop_counter][1]
                    );
                    buffer.lineTo(
                      p0_units[loop_counter][3],
                      p0_units[loop_counter][4]
                    );
                    buffer.closePath();
                    buffer.stroke();
                }

                // Draw range circle.
                buffer.beginPath();
                buffer.arc(
                  p0_units[loop_counter][0],
                  p0_units[loop_counter][1],
                  240,
                  0,
                  pi_times_two,
                  false
                );
                buffer.closePath();
                buffer.stroke();
            }
        } while(loop_counter--);
    }

    buffer.translate(
      -camera_x - x,
      -camera_y - y
    );

    // Draw selection box.
    if (mouse_hold == 1) {
        buffer.beginPath();
        buffer.rect(
          mouse_lock_x,
          mouse_lock_y,
          mouse_x - mouse_lock_x,
          mouse_y - mouse_lock_y
        );
        buffer.closePath();
        buffer.stroke();
    }

    // Draw building while in build mode.
    if (build_mode > 0) {
        buffer.fillStyle='#1f1';

        var building_x = mouse_x - 50;
        var max_x = settings['level-size'] + camera_x + x - 100;
        var min_x = -settings['level-size'] + camera_x + x;

        if (building_x > max_x) {
            building_x = max_x;

        } else if (building_x < min_x) {
            building_x = min_x;
        }

        var building_y = mouse_y - 50;
        var max_y = settings['level-size'] + camera_y + y - 100;
        var min_y = -settings['level-size'] + camera_y + y;

        if (building_y > max_x) {
            building_y = max_x;

        } else if (building_y < min_y) {
            building_y = min_y;
        }

        buffer.fillRect(
          building_x,
          building_y,
          100,
          100
        );

        buffer.fillStyle='#fff';
        buffer.fillText(
          [
            'F',
            'R'
          ][selected_type - 1],
          building_x + 50,
          building_y + 50
        );
    }

    // Draw minimap frame.
    buffer.fillStyle = '#222';
    buffer.fillRect(
      0,
      height - 205,
      205,
      205
    );

    if (selected_type > 0) {
        buffer.fillRect(
          205,
          height - 70,
          70,
          70
        );

        buffer.fillStyle = '#111';
        buffer.fillRect(
          205,
          height - 65,
          65,
          65
        );

        buffer.fillStyle='#fff';
        buffer.fillText(
          [
            'F',
            'R',
          ][selected_type - 1],
          240,
          height - 35
        );
    }

    // Draw player 0 money.
    buffer.fillStyle = '#fff';
    buffer.textAlign = 'left';
    buffer.fillText(
      '$' + money[0],
      5,
      height - 230
    );

    // Draw minimap background.
    buffer.fillStyle = world_static[0][4];
    buffer.fillRect(
      0,
      height - 200,
      200,
      200
    );

    // Draw player 1 buildings on minimap.
    loop_counter = p1_buildings.length - 1;
    if (loop_counter >= 0) {
        buffer.fillStyle = '#600';
        do {
            buffer.fillRect(
              100 + p1_buildings[loop_counter][0] / level_size_math,
              height - 100 + p1_buildings[loop_counter][1] / level_size_math,
              50 / (settings['level-size'] / 200),
              50 / (settings['level-size'] / 200)
            );
        } while(loop_counter--);
    }

    // Draw player 0 buildings on minimap.
    loop_counter = p0_buildings.length - 1;
    if (loop_counter >= 0) {
        do {
            buffer.fillStyle = p0_buildings[loop_counter][5] ? '#1f1' : '#060';
            buffer.fillRect(
              100 + p0_buildings[loop_counter][0] / level_size_math,
              height - 100 + p0_buildings[loop_counter][1] / level_size_math,
              50 / (settings['level-size'] / 200),
              50 / (settings['level-size'] / 200)
            );
        } while(loop_counter--);
    }

    // Draw player 1 units on minimap.
    loop_counter = p1_units.length - 1;
    if (loop_counter >= 0) {
        buffer.fillStyle = '#b00';
        do {
            buffer.fillRect(
              100 + (p1_units[loop_counter][0] - 15) / level_size_math,
              height - 100 + (p1_units[loop_counter][1] - 15) / level_size_math,
              15 / (settings['level-size'] / 200),
              15 / (settings['level-size'] / 200)
            );
        } while(loop_counter--);
    }

    // Draw player 0 units on minimap.
    loop_counter = p0_units.length - 1;
    if (loop_counter >= 0) {
        do {
            buffer.fillStyle = p0_units[loop_counter][2] ? '#1f1' : '#0b0';
            buffer.fillRect(
              100 + (p0_units[loop_counter][0] - 15) / level_size_math,
              height - 100 + (p0_units[loop_counter][1] - 15) / level_size_math,
              15 / (settings['level-size'] / 200),
              15 / (settings['level-size'] / 200)
            );
        } while(loop_counter--);
    }

    // Draw fog of war on minimap.
    buffer.fillStyle = '#000';
    loop_counter = fog.length - 1;
    if (loop_counter >= 0) {
        do {
            buffer.fillRect(
              fog[loop_counter][0] / level_size_math,
              height - 200 + fog[loop_counter][1] / level_size_math,
              50 / (settings['level-size'] / 200),
              50 / (settings['level-size'] / 200)
            );
        } while(loop_counter--);
    }

    // Draw building destination on minimap.
    loop_counter = p0_buildings.length - 1;
    if (loop_counter >= 0) {
        do {
            // If buliding is selected and has a destination, draw destination line.
            if (p0_buildings[loop_counter][5]
              && p0_buildings[loop_counter][6] != null) {
                buffer.beginPath();
                buffer.moveTo(
                  100 + (p0_buildings[loop_counter][0] + p0_buildings[loop_counter][2] / 2) / level_size_math,
                  height - 100 + (p0_buildings[loop_counter][1] + p0_buildings[loop_counter][3] / 2) / level_size_math
                );
                buffer.lineTo(
                  100 + p0_buildings[loop_counter][6] / level_size_math,
                  height - 100 + p0_buildings[loop_counter][7] / level_size_math
                );
                buffer.closePath();
                buffer.stroke();
            }
        } while(loop_counter--);
    }

    // Draw unit destination and range on minimap.
    loop_counter = p0_units.length - 1;
    if (loop_counter >= 0) {
        do {
            // If unit is selected.
            if (p0_units[loop_counter][2]) {

                // If unit has a destination it has not yet reached, draw destination line.
                if (p0_units[loop_counter][0] != p0_units[loop_counter][3]
                  || p0_units[loop_counter][1] != p0_units[loop_counter][4]) {
                    buffer.beginPath();
                    buffer.moveTo(
                      100 + p0_units[loop_counter][0] / level_size_math,
                      height - 100 + p0_units[loop_counter][1] / level_size_math
                    );
                    buffer.lineTo(
                      100 + p0_units[loop_counter][3] / level_size_math,
                      height - 100 + p0_units[loop_counter][4] / level_size_math
                    );
                    buffer.closePath();
                    buffer.stroke();
                }

                // Draw range circle.
                buffer.beginPath();
                buffer.arc(
                  100 + p0_units[loop_counter][0] / level_size_math,
                  height - 100 + p0_units[loop_counter][1] / level_size_math,
                  120 / (settings['level-size'] / 200),
                  0,
                  pi_times_two,
                  false
                );
                buffer.closePath();
                buffer.stroke();
            }
        } while(loop_counter--);
    }

    var temp_height = 0;
    var temp_width = 0;
    var temp_x = 0;
    var temp_y = 0;

    // Draw selection box on minimap.
    if (mouse_hold == 1) {
        // Make sure box cannot go past right edge.
        temp_x = 100 - (x + camera_x - mouse_lock_x) / level_size_math;
        temp_width = (mouse_x - mouse_lock_x) / level_size_math;
        // Box past right edge? Decrease width to fix.
        if (temp_x > 200 - temp_width) {
            temp_width = 200 - temp_x;
        }

        // Make sure box can't go past top edge.
        temp_y = height - 100 - (y + camera_y - mouse_lock_y) / level_size_math;
        temp_height = (mouse_y - mouse_lock_y) / level_size_math;
        // Box past top edge? Decrease height and make sure height isn't negative.
        if (temp_y < height - 200) {
            temp_height -= height - 200 - temp_y;
            if (temp_height < 0) {
                temp_height = 0;
            }

            // Adjust box starting Y position.
            temp_y = height - 200;
        }

        buffer.beginPath();
        buffer.rect(
          temp_x,
          temp_y,
          temp_width,
          temp_height
        );
        buffer.closePath();
        buffer.stroke();
    }

    // Draw camera boundaries on minimap.
    // Make sure box cannot go past right edge.
    temp_x = 100 - x / level_size_math - camera_x / level_size_math;
    temp_width = width / level_size_math;
    // Box past right edge? Decrease width to fix.
    if (temp_x > 200 - temp_width) {
        temp_width = 200 - temp_x;
    }

    // Make sure box can't go past top edge.
    temp_y = height - 100 - y / level_size_math - camera_y / level_size_math;
    temp_height = height / level_size_math;
    // Box past top edge? decrease height and make sure height isn't negative.
    if (temp_y < height - 200) {
        temp_height -= height - 200 - temp_y;
        if (temp_height < 0) {
            temp_height = 0;
        }

        // Adjust box starting Y position.
        temp_y = height - 200;
    }

    buffer.beginPath();
    buffer.rect(
      temp_x,
      temp_y,
      temp_width,
      temp_height
    );
    buffer.closePath();
    buffer.stroke();

    // draw win/lose text if win/lose conditions met
    if ((p0_buildings.length < 1 && p0_units.length < 1)
      || (p1_buildings.length < 1 && p1_units.length < 1)) {
        buffer.textAlign = 'center';

        if (p0_buildings.length < 1) {
            buffer.fillStyle = '#f00';
            buffer.fillText(
              'YOU LOSE! ☹',
              x,
              y / 2
            );

        } else {
            buffer.fillStyle = '#0f0';
            buffer.fillText(
              'YOU WIN! ☺' ,
              x,
              y / 2
            );
        }

        buffer.fillStyle = '#fff';
        buffer.fillText(
          'ESC = Main Menu',
          x,
          y / 2 + 50
        );
    }

    canvas.clearRect(
      0,
      0,
      width,
      height
    );
    canvas.drawImage(
      document.getElementById('buffer'),
      0,
      0
    );

    animationFrame = window.requestAnimationFrame(draw);
}

function fog_update_building() {
    var loop_counter = p0_buildings.length - 1;
    do {
        // Check if each fog unit is within 390px of a building.
        var fog_counter = fog.length - 1;
        if (fog_counter >= 0) {
            do {
                if (Math.sqrt(Math.pow(p0_buildings[loop_counter][1] - fog[fog_counter][1] + settings['level-size'], 2)
                    + Math.pow(p0_buildings[loop_counter][0] - fog[fog_counter][0] + settings['level-size'], 2)
                  ) < 390) {
                    fog.splice(
                      fog_counter,
                      1
                    );
                }
            } while(fog_counter--);
        }
    } while(loop_counter--);
}

function logic() {
	// logic to do:
	////// basic
	// money (2.5s for 1$)
	// camera
    // Handle selection box.
    // If reloading, decrease reload,...

	////// for CPU's units
    // ...else look for nearby p0 units to fire at.
    // If no units in range, look for buildings to fire at.
    // Movement "ai", pick new destination once destination is reached.
    // If not yet reached destination, move and update fog.

	////// for Player's units
    // ...else look for nearby p1 units to fire at.
    // If no units in range, look for buildings to fire at.
	// make sure p0 units are not too close from each other

	////// for bullet's stuff
    // Calculate bullet movement.
    // If reloading, decrease reload,...
    // Move bullet x.
    // Move bullet y.
    // If bullet reaches destination, check for collisions.

    money_timer += 1;
    if (money_timer > 99) {
        money_timer = 0;
        money[0] += 1;
        money[1] += 1;
    }

    // Move camera down.
    if (key_down
		&& camera_y > -settings['level-size']) {
        camera_y -= settings['scroll-speed'];
        mouse_lock_y -= settings['scroll-speed'];
    }

    // Move camera left.
    if (key_left
		&& camera_x < settings['level-size']) {
        camera_x += settings['scroll-speed'];
        mouse_lock_x += settings['scroll-speed'];
    }

    // Move camera right.
    if (key_right
		&& camera_x > -settings['level-size']) {
        camera_x -= settings['scroll-speed'];
        mouse_lock_x -= settings['scroll-speed'];
    }

    // Move camera up.
    if (key_up
		&& camera_y < settings['level-size']) {
        camera_y += settings['scroll-speed'];
        mouse_lock_y += settings['scroll-speed'];
    }

    // Handle selection box.
    if (mouse_hold == 1) {
        select();
    }

    buffer.clearRect(
      0,
      0,
      width,
      height
    );

    if (p1_buildings.length > 1) {
        if (money[1] >= 100) {
            money[1] -= 100;
            p1_units.push([
              p1_buildings[1][0] + p1_buildings[1][2] / 2,// X
              p1_buildings[1][1] + p1_buildings[1][3] / 2,// Y
              Math.floor(Math.random() * settings['level-size'] * 2) - settings['level-size'],// Destination X
              Math.floor(Math.random() * settings['level-size'] * 2) - settings['level-size'],// Destination Y
              0,// Weapon reload
              100,// Health
            ]);
        }
    }

    loop_counter = p1_units.length - 1;
    if (loop_counter >= 0) {
        do {
            // If reloading, decrease reload,...
            if (p1_units[loop_counter][4] > 0) {
                p1_units[loop_counter][4] -= 1;

            // ...else look for nearby p0 units to fire at.
            } else {
                var check_for_buildings = true;
                var p0_units_counter = p0_units.length - 1;
                if (p0_units_counter >= 0) {
                    do {
                        if (Math.sqrt(Math.pow(p1_units[loop_counter][1] - p0_units[p0_units_counter][1], 2)
                         + Math.pow(p1_units[loop_counter][0] - p0_units[p0_units_counter][0], 2)) < 240) {
                            p1_units[loop_counter][4] = 75;
                            bullets.push([
                              p1_units[loop_counter][0],// X
                              p1_units[loop_counter][1],// Y
                              p0_units[p0_units_counter][0],// destination X
                              p0_units[p0_units_counter][1],// destination Y
                              1,// Player
                            ]);
                            check_for_buildings = false;
                            break;
                        }
                    } while(p0_units_counter--);
                }

                // If no units in range, look for buildings to fire at.
                if (check_for_buildings) {
                    var p0_buildings_counter = p0_buildings.length - 1;
                    if (p0_buildings_counter >= 0) {
                        do {
                            if (Math.sqrt(Math.pow(p1_units[loop_counter][1] - (p0_buildings[p0_buildings_counter][1] + 50), 2)
                             + Math.pow(p1_units[loop_counter][0] - (p0_buildings[p0_buildings_counter][0] + 50), 2)) < 240) {
                                p1_units[loop_counter][4] = 75;
                                bullets.push([
                                  p1_units[loop_counter][0],// X
                                  p1_units[loop_counter][1],// Y
                                  p0_buildings[p0_buildings_counter][0] + 50,// Destination X
                                  p0_buildings[p0_buildings_counter][1] + 50,// Destination Y
                                  1,//To Player
                                ]);
                                break;
                            }
                        } while(p0_buildings_counter--);
                    }
                }
            }

            // Movement "ai", pick new destination once destination is reached.
			//if (in_position(p1_units[loop_counter][0],
							//p1_units[loop_counter][3],
							//p1_units[loop_counter][1],
							//p1_units[loop_counter][4])) {
            if (p1_units[loop_counter][0] != p1_units[loop_counter][2]
              || p1_units[loop_counter][1] != p1_units[loop_counter][3]) {
                var j = m(
                  p1_units[loop_counter][0],
                  p1_units[loop_counter][1],
                  p1_units[loop_counter][2],
                  p1_units[loop_counter][3]
                );

                if (p1_units[loop_counter][0] != p1_units[loop_counter][2]) {
                    p1_units[loop_counter][0] += 
                      (p1_units[loop_counter][0] > p1_units[loop_counter][2] ?
					   -j[0] :
					   j[0]) * moving_speed;
                }

                if (p1_units[loop_counter][1] != p1_units[loop_counter][3]) {
                    p1_units[loop_counter][1] +=
                      (p1_units[loop_counter][1] > p1_units[loop_counter][3] ?
					   -j[1] :
					   j[1]) * moving_speed;
                }

                if (p1_units[loop_counter][0] > p1_units[loop_counter][2] - 5
                  && p1_units[loop_counter][0] < p1_units[loop_counter][2] + 5
                  && p1_units[loop_counter][1] > p1_units[loop_counter][3] - 5
                  && p1_units[loop_counter][1] < p1_units[loop_counter][3] + 5) {
                    p1_units[loop_counter][2] = Math.floor(Math.random() * settings['level-size'] * 2) - settings['level-size'];
                    p1_units[loop_counter][3] = Math.floor(Math.random() * settings['level-size'] * 2) - settings['level-size'];
                }

            }
        } while(loop_counter--);
    }

    loop_counter = p0_units.length - 1;
    if (loop_counter >= 0) {
        do {
            // If not yet reached destination, move and update fog.
			if (in_position(1,
							p0_units[loop_counter][0],
							p0_units[loop_counter][1],
							p0_units[loop_counter][3],
							p0_units[loop_counter][4])) {
				// mark that unit is moving
				p0_units[loop_counter][7] = true;

                var j = m(
                  p0_units[loop_counter][0],
                  p0_units[loop_counter][1],
                  p0_units[loop_counter][3],
                  p0_units[loop_counter][4]
                );


				//if (heavy_debug_flag)
					//console.log(
						//p0_units[loop_counter][0],
						//p0_units[loop_counter][1],
						//p0_units[loop_counter][3],
						//p0_units[loop_counter][4]
					//);

                if (p0_units[loop_counter][0] != p0_units[loop_counter][3]) {
                    p0_units[loop_counter][0] +=
						(p0_units[loop_counter][0] > p0_units[loop_counter][3] ?
						 -j[0] :
						 j[0]) * moving_speed;
                }

                if (p0_units[loop_counter][1] != p0_units[loop_counter][4]) {
                    p0_units[loop_counter][1] +=
						(p0_units[loop_counter][1] > p0_units[loop_counter][4] ?
						 -j[1] :
						 j[1]) * moving_speed;
                }

                var fog_counter = fog.length - 1;
                if (fog_counter >= 0) {
                    do {
                        if (Math.sqrt(Math.pow(p0_units[loop_counter][1] - fog[fog_counter][1] + settings['level-size'] - 50, 2)
                            + Math.pow(p0_units[loop_counter][0] - fog[fog_counter][0] + settings['level-size'] - 50, 2)
                          ) < 290) {
                            fog.splice(
                              fog_counter,
                              1
                            );
                        }
                    } while(fog_counter--);
                }
            } else {
				// When reached destination 
				// units should not too close to each other

				//mark unit is not moving
				p0_units[loop_counter][7] = false;
				for (var it = 0; it< p0_units.length; it += 1) {
					if (it == loop_counter) {

					} else {
						// only check units which are not moving
						if (!p0_units[it][7]
							&& distance(p0_units[loop_counter],
										p0_units[it]) <= 20) {
							keep_distance(p0_units[loop_counter],
										  p0_units[it]);
							break;
						}
					}
				}
			}

            // If reloading, decrease reload,...
            if (p0_units[loop_counter][5] > 0) {
                p0_units[loop_counter][5] -= 1;

            // ...else look for nearby p1 units to fire at.
            } else {
                var check_for_buildings = true;
                var p1_units_counter = p1_units.length - 1;
                if (p1_units_counter >= 0) {
                    do {
                        if (Math.sqrt(Math.pow(p0_units[loop_counter][1] - p1_units[p1_units_counter][1], 2)
                         + Math.pow(p0_units[loop_counter][0] - p1_units[p1_units_counter][0], 2)) < 240) {
                            p0_units[loop_counter][5] = 75;
                            bullets.push([
                              p0_units[loop_counter][0],// X
                              p0_units[loop_counter][1],// Y
                              p1_units[p1_units_counter][0],// destination X
                              p1_units[p1_units_counter][1],// destination Y
                              0// To CPU
                            ]);
                            check_for_buildings = false;
                            break;
                        }
                    } while(p1_units_counter--);
                }

                // If no units in range, look for buildings to fire at.
                if (check_for_buildings) {
                    var p1_buildings_counter = p1_buildings.length - 1;
                    if (p1_buildings_counter >= 0) {
                        do {
                            if (Math.sqrt(Math.pow(p0_units[loop_counter][1] - (p1_buildings[p1_buildings_counter][1] + 50), 2)
                             + Math.pow(p0_units[loop_counter][0] - (p1_buildings[p1_buildings_counter][0] + 50), 2)) < 240) {
                                p0_units[loop_counter][5] = 75;
                                bullets.push([
                                  p0_units[loop_counter][0],// X
                                  p0_units[loop_counter][1],// Y
                                  p1_buildings[p1_buildings_counter][0] + 50,// Destination X
                                  p1_buildings[p1_buildings_counter][1] + 50,// Destination Y
                                  0// Player
                                ]);
                                break;
                            }
                        } while(p1_buildings_counter--);
                    }
                }
            }
        } while(loop_counter--);
    }

    loop_counter = bullets.length - 1;
    if (loop_counter >= 0) {
        do {
            // Calculate bullet movement.
            var j = m(
              bullets[loop_counter][0],
              bullets[loop_counter][1],
              bullets[loop_counter][2],
              bullets[loop_counter][3]
            );

            // Move bullet x.
            if (bullets[loop_counter][0] != bullets[loop_counter][2]) {
                bullets[loop_counter][0] +=
					10 *
					(bullets[loop_counter][0] > bullets[loop_counter][2] ?
					 -j[0] :
					 j[0]);
            }

            // Move bullet y.
            if (bullets[loop_counter][1] != bullets[loop_counter][3]) {
                bullets[loop_counter][1] +=
					10 *
					(bullets[loop_counter][1] > bullets[loop_counter][3] ?
					 -j[1] :
					 j[1]);
            }

            // If bullet reaches destination(in a 10x10 area)
			// check for collisions.
            if (in_position(10, //in 10x10 area of destination
							bullets[loop_counter][0],
							bullets[loop_counter][1],
							bullets[loop_counter][2],
							bullets[loop_counter][3])) {
                continue;
            }

            if (bullets[loop_counter][4]) {
                var p0_units_counter = p0_units.length - 1;
                if (p0_units_counter >= 0) {
                    do {
                        if (bullets[loop_counter][0] <= p0_units[p0_units_counter][0] - 15
                          || bullets[loop_counter][0] >= p0_units[p0_units_counter][0] + 15
                          || bullets[loop_counter][1] <= p0_units[p0_units_counter][1] - 15
                          || bullets[loop_counter][1] >= p0_units[p0_units_counter][1] + 15) {
                            continue;
                        }

                        p0_units[p0_units_counter][6] -= 25;
                        if (p0_units[p0_units_counter][6] <= 0) {
                            p0_units.splice(
                              p0_units_counter,
                              1
                            );
                        }
                        break;
                    } while(p0_units_counter--);
                }

                var p0_buildings_counter = p0_buildings.length - 1;
                if (p0_buildings_counter >= 0) {
                    do {
                        if (bullets[loop_counter][0] <= p0_buildings[p0_buildings_counter][0]
                          || bullets[loop_counter][0] >= p0_buildings[p0_buildings_counter][0] + 100
                          || bullets[loop_counter][1] <= p0_buildings[p0_buildings_counter][1]
                          || bullets[loop_counter][1] >= p0_buildings[p0_buildings_counter][1] + 100) {
                            continue;
                        }

                        p0_buildings[p0_buildings_counter][4] -= 25;
                        if (p0_buildings[p0_buildings_counter][4] <= 0) {
                            p0_buildings.splice(
                              p0_buildings_counter,
                              1
                            );
                        }
                        break;
                    } while(p0_buildings_counter--);
                }

            } else {
                var p1_units_counter = p1_units.length - 1;
                if (p1_units_counter >= 0) {
                    do {
                        if (bullets[loop_counter][0] <= p1_units[p1_units_counter][0] - 15
                          || bullets[loop_counter][0] >= p1_units[p1_units_counter][0] + 15
                          || bullets[loop_counter][1] <= p1_units[p1_units_counter][1] - 15
                          || bullets[loop_counter][1] >= p1_units[p1_units_counter][1] + 15) {
                            continue;
                        }

                        p1_units[p1_units_counter][5] -= 25;
                        if (p1_units[p1_units_counter][5] <= 0) {
                            p1_units.splice(
                              p1_units_counter,
                              1
                            );
                        }
                        break;
                    } while(p1_units_counter--);
                }

                var p1_buildings_counter = p1_buildings.length - 1;
                if (p1_buildings_counter >= 0) {
                    do {
                        if (bullets[loop_counter][0] <= p1_buildings[p1_buildings_counter][0]
                          || bullets[loop_counter][0] >= p1_buildings[p1_buildings_counter][0] + 100
                          || bullets[loop_counter][1] <= p1_buildings[p1_buildings_counter][1]
                          || bullets[loop_counter][1] >= p1_buildings[p1_buildings_counter][1] + 100) {
                            continue;
                        }

                        p1_buildings[p1_buildings_counter][4] -= 25;
                        if (p1_buildings[p1_buildings_counter][4] <= 0) {
                            p1_buildings.splice(
                              p1_buildings_counter,
                              1
                            );
                        }
                        break;
                    } while(p1_buildings_counter--);
                }
            }
            bullets.splice(
              loop_counter,
              1
            );
        } while(loop_counter--);
    }
}

// TODO: Improve clarity.
function m(x0, y0, x1, y1) {
    var j0 = Math.abs(x0 - x1);
    var j1 = Math.abs(y0 - y1);

	//if (heavy_debug_flag)
		//console.log("m(int**4)", x0, y0, x1, y1);

    if (j0 > j1) {
        return [1, j1 / j0];

    } else {
        return j1 > j0 ? [j0 / j1, 1] : [.5, .5];
    }
}

function in_position(range, x0, y0, x1, y1) {
	var res = Math.abs(x0 - x1) <= range && Math.abs(y0 - y1) <= range ? false : true;
	if (heavy_debug_flag) {
		console.log("in_position?", x0, y0, x1, y1);
		console.log("in_position?", !res);
	}
	return res;
}

function distance(u1, u2) {
	return Math.sqrt(Math.pow(u1[0] - u2[0], 2) +
					 Math.pow(u1[1] - u2[1], 2));
}

function keep_distance(u1, u2) {
	//console.log('random_walk called');
	//console.log(u2[0] - u1[0]);
	//console.log(u2[1] - u1[1]);
	var rand1 = Math.random();
	var rand2 = Math.random();
	// 2 * rand1 and 2 * rand2 is to seperate units
	// that have exactly the same (x,y)   
    // you can try using one random number instead of two
	// it's hard to describe
	u1[3] = Math.round(u1[3] - 1.0 * rand2 * (u2[0] - u1[0] + 2 * rand1)); 
	u1[4] = Math.round(u1[4] - 1.0 * rand1 * (u2[1] - u1[1] + 2 * rand2));
}

function play_audio(id) {
    if (settings['audio-volume'] <= 0) {
        return;
    }

    document.getElementById(id).currentTime = 0;
    document.getElementById(id).play();
}

function reset() {
    if (!confirm('Reset settings?')) {
        return;
    }

    document.getElementById('audio-volume').value = 1;
    document.getElementById('camera-keys').value = 'WASD';
    document.getElementById('fog-of-war').checked = true;
    document.getElementById('level-size').value = 1600;
    document.getElementById('ms-per-frame').value = 25;
    document.getElementById('scroll-speed').value = 10;

    save();
}

function resize() {
    if (mode <= 0) {
        return;
    }

    height = window.innerHeight;
    document.getElementById('buffer').height = height;
    document.getElementById('canvas').height = height;
    y = height / 2;

    width = window.innerWidth;
    document.getElementById('buffer').width = width;
    document.getElementById('canvas').width = width;
    x = width / 2;

	console.log("set (x,y)", x, y);
}

function save() {
    // Save audio-volume setting.
    if (document.getElementById('audio-volume').value === 1) {
        window.localStorage.removeItem('RTS-2D.htm-audio-volume');
        settings['audio-volume'] = 1;

    } else {
        settings['audio-volume'] = parseFloat(document.getElementById('audio-volume').value);
        window.localStorage.setItem(
          'RTS-2D.htm-audio-volume',
          settings['audio-volume']
        );
    }

    // Save camera-keys setting.
    if (document.getElementById('camera-keys').value == 'WASD') {
        window.localStorage.removeItem('RTS-2D.htm-camera-keys');
        settings['camera-keys'] = 'WASD';

    } else {
        settings['camera-keys'] = document.getElementById('camera-keys').value;
        window.localStorage.setItem(
          'RTS-2D.htm-camera-keys',
          settings['camera-keys']
        );
    }

    // Save fog-of-war setting.
    if (document.getElementById('fog-of-war').checked) {
        window.localStorage.removeItem('RTS-2D.htm-fog-of-war');
        settings['fog-of-war'] = true;

    } else {
        settings['fog-of-war'] = false;
        window.localStorage.setItem(
          'RTS-2D.htm-fog-of-war',
          0
        );
    }

    // Save level-size setting.
    if (document.getElementById('level-size').value == 1600
		|| isNaN(document.getElementById('level-size').value)
		|| document.getElementById('level-size').value < 200) {
        window.localStorage.removeItem('RTS-2D.htm-level-size');
        document.getElementById('level-size').value = 1600;
        settings['level-size'] = 1600;

    } else {
        settings['level-size'] =
			parseInt(document.getElementById('level-size').value);
        window.localStorage.setItem(
          'RTS-2D.htm-level-size',
          settings['level-size']
        );
    }

    // Save ms-per-frame setting.
    if (document.getElementById('ms-per-frame').value == 25
		|| isNaN(document.getElementById('ms-per-frame').value)
		|| document.getElementById('ms-per-frame').value < 1) {
        window.localStorage.removeItem('RTS-2D.htm-ms-per-frame');
        document.getElementById('ms-per-frame').value = 25;
        settings['ms-per-frame'] = 25;

    } else {
        settings['ms-per-frame'] =
			parseInt(document.getElementById('ms-per-frame').value);
        window.localStorage.setItem(
          'RTS-2D.htm-ms-per-frame',
          settings['ms-per-frame']
        );
    }

    // Save scroll-speed setting.
    if (document.getElementById('scroll-speed').value == 10
		|| isNaN(document.getElementById('scroll-speed').value)
		|| document.getElementById('scroll-speed').value < 1) {
        window.localStorage.removeItem('RTS-2D.htm-scroll-speed');
        document.getElementById('scroll-speed').value = 10;
        settings['scroll-speed'] = 10;

    } else {
        settings['scroll-speed'] =
			parseInt(document.getElementById('scroll-speed').value);
        window.localStorage.setItem(
          'RTS-2D.htm-scroll-speed',
          settings['scroll-speed']
        );
    }
}

function select() {
    selected_id = -1;
    selected_type = -1;

    loop_counter = p0_units.length - 1;
    if (loop_counter >= 0) {
        do {
            p0_units[loop_counter][2] = (
                (mouse_lock_x <
				 x + p0_units[loop_counter][0] + camera_x + 15
                 && mouse_x >
				 x + p0_units[loop_counter][0] + camera_x - 15)
					|| (mouse_lock_x >
						x + p0_units[loop_counter][0] + camera_x - 15
						&& mouse_x <
						x + p0_units[loop_counter][0] + camera_x + 15)
            )&&(
                (mouse_lock_y <
				 y + p0_units[loop_counter][1] + camera_y + 15
                 && mouse_y >
				 y + p0_units[loop_counter][1] + camera_y - 15)
					|| (mouse_lock_y >
						y + p0_units[loop_counter][1] + camera_y - 15
						&& mouse_y <
						y + p0_units[loop_counter][1] + camera_y + 15));

            if (p0_units[loop_counter][2]) {
                selected_id = loop_counter;
                selected_type = 0;
            }
        } while(loop_counter--);
    }

    loop_counter = p0_buildings.length - 1;
    if (loop_counter >= 0) {
        do {
            if (selected_type == -1) {
                p0_buildings[loop_counter][5] = (
                    (mouse_lock_x <
					 x + p0_buildings[loop_counter][0] +
					 camera_x + p0_buildings[loop_counter][2]
                     && mouse_x >
					 x + p0_buildings[loop_counter][0] + camera_x)
						|| (mouse_lock_x >
							x + p0_buildings[loop_counter][0] + camera_x
							&& mouse_x <
							x + p0_buildings[loop_counter][0] +
							camera_x + p0_buildings[loop_counter][2])
                )&&(
                    (mouse_lock_y <
					 y + p0_buildings[loop_counter][1] +
					 camera_y + p0_buildings[loop_counter][3]
                     && mouse_y >
					 y + p0_buildings[loop_counter][1] + camera_y)
						|| (mouse_lock_y >
							y + p0_buildings[loop_counter][1] + camera_y
							&& mouse_y <
							y + p0_buildings[loop_counter][1] +
							camera_y + p0_buildings[loop_counter][3]));

                if (p0_buildings[loop_counter][5]) {
                    selected_id = loop_counter;
                    selected_type = p0_buildings[loop_counter][8];
                }

            } else {
                p0_buildings[loop_counter][5] = 0;
            }
        } while(loop_counter--);
    }
}

function get_mouse_position_and_set_destination(on_minimap) {
	var loop_counter;
	var dest_x, dest_y;

	// get destination from mouse (x,y)
	dest_x = on_minimap ?
		level_size_math * (mouse_x - 100) :
		mouse_x - x - camera_x;

    if (dest_x > settings['level-size']) {
		dest_x = settings['level-size'];
    } else if (dest_x < -settings['level-size']) {
		dest_x = settings['level-size'];
    }

	dest_y = on_minimap ?
        level_size_math * (mouse_y - height + 100) :
        mouse_y - y - camera_y;

    if (dest_y > settings['level-size']) {
		dest_y = settings['level-size'];
    } else if (dest_y < -settings['level-size']) {
		dest_y = -settings['level-size'];
    }

	// find out which units/buidling to set destination
	var index_to_set_dest = [];
    if (selected_type == 0) {
        loop_counter = p0_units.length - 1;
        if (loop_counter >= 0) {
            do {
				// if selected
                if (p0_units[loop_counter][2]) {
					//p0_units[loop_counter][3] = dest_x;
					//p0_units[loop_counter][4] = dest_y;
					index_to_set_dest.push(loop_counter);
                }
            } while(loop_counter--);
        }
		if (debug_flag)
			console.log("index of unit(s) to set destination: ",
						index_to_set_dest);
		set_destitation(selected_type, index_to_set_dest, dest_x, dest_y);

    } else if (selected_type > 1) {
        loop_counter = p0_buildings.length - 1;
        if (loop_counter >= 0) {
            do {
                if (p0_buildings[loop_counter][5]) {
					index_to_set_dest.push(loop_counter);
                }
            } while(loop_counter--);
        }
		if (debug_flag)
			console.log("index of building(s) to set destination: ",
						index_to_set_dest);
		set_destitation(selected_type, index_to_set_dest, dest_x, dest_y);
    }
}

// to be on server functions
function set_destitation(type,
						 index_of_units_to_set_dest, dest_x, dest_y) {
	// index of destination: 3,4 for units; 6,7 for buildings
	console.log(type);
	var x_index, y_index, it;
	if (type === 0) {
		for (it = 0; it < index_of_units_to_set_dest.length; it+=1) {
			if (debug_flag)
				console.log("setting destination for unit(s):",
							index_of_units_to_set_dest[it]);
			p0_units[index_of_units_to_set_dest[it]][3] = dest_x;
			p0_units[index_of_units_to_set_dest[it]][4] = dest_y;
		}
	} else if (type > 1) {
		for (it = 0; it < index_of_units_to_set_dest.length; it+=1) {
			if (debug_flag)
				console.log("setting destination for buildings(s):",
							index_of_units_to_set_dest[it]);
			p0_buildings[index_of_units_to_set_dest[it]][6] = dest_x;
			p0_buildings[index_of_units_to_set_dest[it]][7] = dest_y;
		}
	}
}

function setmode(newmode) {
    window.cancelAnimationFrame(animationFrame);
    clearInterval(interval);

    bullets = [];
    mode = newmode;

    // New game mode.
    if (mode > 0) {
        save();

        key_down = false;
        key_left = false;
        key_right = false;
        key_up = false;

        level_size_math = settings['level-size'] / 100;

        money = [
          1000,
          10000,
        ];
        mouse_hold = 0;
        mouse_lock_x = -1;
        mouse_lock_y = -1;
        mouse_x = -1;
        mouse_y = -1;
        selected_type = -1;

        document.getElementById('page').innerHTML = '<canvas id=canvas oncontextmenu="return false"></canvas><canvas id=buffer style=display:none></canvas>';
        document.getElementById('canvas').style.background = [
          '#277',
          '#444',
          '#321',
        ][mode - 1];

		world_init();

        buffer = document.getElementById('buffer').getContext('2d');
        canvas = document.getElementById('canvas').getContext('2d');

        resize();

        animationFrame = window.requestAnimationFrame(draw);
        interval = setInterval(
          'logic()',
          settings['ms-per-frame']
        );

		// parse moving speed;

    // Main menu mode.
    } else {
        buffer = 0;
        canvas = 0;

        document.getElementById('page').innerHTML = '<div style=display:inline-block;text-align:left;vertical-align:top><div class=c><b>RTS-2D.htm</b></div><hr><div class=c><b>Skirmish vs AI:</b><ul><li><a onclick=setmode(1)>Island</a><li><a onclick=setmode(2)>Urban</a><li><a onclick=setmode(3)>Wasteland</a></ul></div></div><div style="border-left:8px solid #222;display:inline-block;text-align:left"><div class=c><input id=camera-keys maxlength=4 value='
          + settings['camera-keys'] + '>Camera ↑←↓→<br><input disabled style=border:0 value=ESC>Main Menu</div><hr><div class=c><input id=audio-volume max=1 min=0 step=.01 type=range value='
          + settings['audio-volume'] + '>Audio<br><label><input '
          + (settings['fog-of-war'] ? 'checked ' : '') + 'id=fog-of-war type=checkbox>Fog of War</label><br><input id=level-size value='
          + settings['level-size'] + '>*2 Level Size<br><input id=ms-per-frame value='
          + settings['ms-per-frame'] + '>ms/Frame<br><input id=scroll-speed value='
          + settings['scroll-speed'] + '>Scroll Speed<br><a onclick=reset()>Reset Settings</a></div></div>';
    }
}

function world_init() {
    world_static = [
        [
				-settings['level-size'],
				-settings['level-size'],
            settings['level-size'] * 2,
            settings['level-size'] * 2,
            [
				'#765',
				'#333',
				'#432',
            ][mode - 1],
        ],
    ];

    // Choose random starting locations.
    var start_x = Math.floor(Math.random() * 2);
    var start_y = Math.floor(Math.random() * 2);

    // Create player 0 HQ.
    p0_buildings = [
        [
            start_x ?
				-settings['level-size'] + 25 :
				settings['level-size'] - 125,// X
            start_y ?
				settings['level-size'] - 125 :
				-settings['level-size'] + 25,// Y
            100,// Width
            100,// Height
            1000,// Health
            0,// Selected
            start_x ?
				-settings['level-size'] + 75 :
				settings['level-size'] - 75,// Destination X
            start_y ?
				settings['level-size'] - 75 :
				-settings['level-size'] + 75,// Destination Y
            1,// Type
        ],
    ];

    // Create player 1 HQ and Factory.
    p1_buildings = [
        [
            start_x ?
				settings['level-size'] - 125 :
				-settings['level-size'] + 25,// X
            start_y ?
				-settings['level-size'] + 25 :
				settings['level-size'] -125,// Y
            100,// Width
            100,// Height
            1000,// Health
            1,// Type
        ],[
            start_x ?
				settings['level-size'] - 250 :
				-settings['level-size'] + 150,// X
            start_y ?
				-settings['level-size'] + 25 :
				settings['level-size'] -125,// Y
            100,// Width
            100,// Height
            1000,// Health
            2,// Type
        ],
    ];

    // Remove all units.
    p0_units = [];
    p1_units = [];

    // Set camera position to HQ location.
    camera_x = -p0_buildings[0][0] - 50;
    camera_y = -p0_buildings[0][1] - 50;

    // Add fog of war, if settings allow it.
    fog = [];
    if (settings['fog-of-war']) {
        var temp_x = 0;
        var temp_y = 0;
        var times = Math.floor(settings['level-size'] / 50);// Half of level width divided by half of fog unit.

        var loop_counter = Math.pow(times, 2) - 1;// True number of fog units to add.
        do {
            fog.push([
                temp_x * 100,// Fog X
                temp_y,// Fog Y
            ]);

            // Add next fog unit one fog unit space to the right.
            temp_x += 1;

            // Done with this row, move on to the next.
            if (loop_counter % times == 0) {
                temp_y += 100;
                temp_x = 0;
            }
        } while(loop_counter--);

        // Remove fog around initial buildings.
        fog_update_building();
    }
}

function validate_camera_move(mouse_x, mouse_y) {
    camera_x = -level_size_math * (mouse_x - 100);
    if (camera_x > settings['level-size']) {
        camera_x = settings['level-size'];
    } else if (camera_x < -settings['level-size']) {
        camera_x = -settings['level-size'];
    }

    camera_y = -level_size_math * (mouse_y - height + 100);
    if (camera_y > settings['level-size']) {
        camera_y = settings['level-size'];
    } else if (camera_y < -settings['level-size']) {
        camera_y = -settings['level-size'];
    }
}

// debug flag variables
var debug_flag = true;
var heavy_debug_flag = false; // print some msg every frame(cost a log of cpu)
var draw_frame_count = 0;

console.log("debug flag", debug_flag);

// state variables
var animationFrame = 0;
var buffer = 0;
var build_mode = 0;
var canvas = 0;
var camera_x = 0;
var camera_y = 0;
var height = 0;
var interval = 0;
var key_down = false;
var key_left = false;
var key_right = false;
var key_up = false;
var level_size_math = 0;
var mode = 0;
var money_timer = 0;
var mouse_hold = 0;
var mouse_lock_x = 0;
var mouse_lock_y = 0;
var mouse_x = 0;
var mouse_y = 0;
var money = [];
var fog = [];
var bullets = [];
var p0_buildings = [];
// [5] for selection
// [6][7] for destination
var p0_units = [];
/* p0_units structure
 0/1: current location (x,y)
 2  : fill color (selected or not)('#1f1' : '#0b0')
 3/4: destination (x,y)
 5  : bullet reload timer
 6  : HP
 7  : is moving or not (true for moving)
*/
var p1_buildings = [];
var p1_units = [];
var pi_times_two = Math.PI * 2;
var selected_id = -1;
var selected_type = -1;
var settings = {
  'audio-volume':
	window.localStorage.getItem('RTS-2D.htm-audio-volume') === null ?
		1 :
		parseFloat(window.localStorage.getItem('RTS-2D.htm-audio-volume')),
  'camera-keys':
	window.localStorage.getItem('RTS-2D.htm-camera-keys') === null ?
		'WASD' :
		window.localStorage.getItem('RTS-2D.htm-camera-keys'),
  'fog-of-war': window.localStorage.getItem('RTS-2D.htm-fog-of-war') === null,
  'level-size':
	window.localStorage.getItem('RTS-2D.htm-level-size') === null ?
		1600 :
		parseFloat(window.localStorage.getItem('RTS-2D.htm-level-size')),
  'ms-per-frame':
	window.localStorage.getItem('RTS-2D.htm-ms-per-frame') === null ?
		25 :
		parseInt(window.localStorage.getItem('RTS-2D.htm-ms-per-frame')),
  'scroll-speed':
	window.localStorage.getItem('RTS-2D.htm-scroll-speed') === null ?
		10 :
		parseInt(window.localStorage.getItem('RTS-2D.htm-scroll-speed'))
};
var width = 0;
var world_static = [];
var x = 0;
var y = 0;
var moving_speed = 0.75;

setmode(0);

window.onkeydown = function(e) {
    if (mode <= 0) {
        return;
    }

    var key = e.keyCode || e.which;

    if (key === 27) {
        if (build_mode > 0) {
            build_mode = 0;

        } else {
            setmode(0);
        }

        return;
    }

    // user selected HQ
    if (selected_type === 1) {
        if (key === 70) {
            build_mode = 1;
			console.log("build mode = 1");
            return;
        }

    // user selected factory and pressed R button
    } else if (selected_type === 2
      && key === 82) {
        build_robot();
        return;
    }

    key = String.fromCharCode(key);

    if (key === settings['camera-keys'][1]) {
        key_left = true;

    } else if (key === settings['camera-keys'][3]) {
        key_right = true;

    } else if (key === settings['camera-keys'][2]) {
        key_down = true;

    } else if (key === settings['camera-keys'][0]) {
        key_up = true;
    }
};

window.onkeyup = function(e) {
    var key = String.fromCharCode(e.keyCode || e.which);

    if (key === settings['camera-keys'][1]) {
        key_left = false;

    } else if (key === settings['camera-keys'][3]) {
        key_right = false;

    } else if (key === settings['camera-keys'][2]) {
        key_down = false;

    } else if (key === settings['camera-keys'][0]) {
        key_up = false;
    }
};

window.onmousedown = function(e) {
    if (mode <= 0) {
        return;
    }

    e.preventDefault();

    // If not clicking on minimap.
	if (debug_flag) {
		console.log("mouse (x,y)", mouse_x, mouse_y);
	}

    if (mouse_x > 200
      || mouse_y < height - 200) {

        // Check if in buildling mode.
        if (build_mode > 0) {
            // Build a factory.
            if (money[0] >= 250) {
                build_mode = 0;
				console.log("build mode = 0");

                money[0] -= 250;

                // Make sure building is within buildable limit.
                var building_x = mouse_x - camera_x - x - 50;
                if (building_x > settings['level-size'] - 100) {
                    building_x = settings['level-size'] - 100;
                } else if (building_x < -settings['level-size']) {
                    building_x = -settings['level-size'];
                }

                var building_y = mouse_y - camera_y - y - 50;
                if (building_y > settings['level-size'] - 100) {
                    building_y = settings['level-size'] - 100;

                } else if (building_y < -settings['level-size']) {
                    building_y = -settings['level-size'];
                }

				// TODO: build_building function
                p0_buildings.push(
                  [
                    building_x,
                    building_y,
                    100,// Width
                    100,// Height
                    1000,// Health
                    0,// Selected
                    building_x + 50,// Destination X
                    building_y + 50,// Destination Y
                    2,// Type
                  ]
                );

                // Remove fog around buildings.
                fog_update_building();
            }

        // If unit selected or not clicking on build robot button.
        } else if (selected_type < 1
				   || (mouse_y < height - 65 || mouse_x > 270)) {
            // Left click: start dragging.
            if (e.button == 0) {
                mouse_hold = 1;
                mouse_lock_x = mouse_x;
                mouse_lock_y = mouse_y;

            // Right click: try to set selected building/unit destination.
            } else if (e.button == 2) {
                get_mouse_position_and_set_destination(false);
            }

        // Else if HQ is selected, activate build mode.
        } else if (selected_type == 1) {
            build_mode = 1;
			console.log("build mode = 1");

        // Else if factory is selected, build robot.
        } else if (selected_type == 2) {
            build_robot();
        }

    // Right clicking on minimap.
    } else if (e.button == 2) {
        get_mouse_position_and_set_destination(true);

    // Other clicks: move camera.
    } else {
        mouse_hold = 2;

        validate_camera_move(
          mouse_x,
          mouse_y
        );
    }
};

window.onmousemove = function(e) {
    if (mode <= 0) {
        return;
    }

    mouse_x = e.pageX;
    if (mouse_x < 0) {
        mouse_x = 0;
    } else if (mouse_x > width) {
        mouse_x = width;
    }

    mouse_y = e.pageY;
    if (mouse_y < 0) {
        mouse_y = 0;
    } else if (mouse_y > height) {
        mouse_y = height;
    }

    // Dragging after click was not on minimap.
    if (mouse_hold == 1) {
        select();

    // Dragging after click was on minimap.
    } else if (mouse_hold == 2) {
        validate_camera_move(
          mouse_x,
          mouse_y
        );
    }
};

window.onmouseup = function() {
    mouse_hold = 0;
};

window.onresize = resize;

window.onbeforeunload = function () {
	return 'Quit?';
};
