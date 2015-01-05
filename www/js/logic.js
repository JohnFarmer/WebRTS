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
              Math.floor(Math.random() * settings['level-size'] * 2)
					- settings['level-size'],// Destination X
              Math.floor(Math.random() * settings['level-size'] * 2)
					- settings['level-size'],// Destination Y
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
                        if (Math.sqrt(Math.pow(p1_units[loop_counter][1] -
											   p0_units[p0_units_counter][1],
											   2) +
									  Math.pow(p1_units[loop_counter][0] -
											   p0_units[p0_units_counter][0],
											   2))
							< 240) {
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
                            if (Math.sqrt(Math.pow(p1_units[loop_counter][1] -
												   (p0_buildings[p0_buildings_counter][1] + 50), 2) +
										  Math.pow(p1_units[loop_counter][0] -
												   (p0_buildings[p0_buildings_counter][0] + 50), 2))
								< 240) {
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
			//if (!in_range(p1_units[loop_counter][0],
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
					   -j[0] : j[0]) *
						moving_speed;
                }

                if (p1_units[loop_counter][1] != p1_units[loop_counter][3]) {
                    p1_units[loop_counter][1] +=
                      (p1_units[loop_counter][1] > p1_units[loop_counter][3] ?
					   -j[1] : j[1]) *
						moving_speed;
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
			if (!in_range(1,
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
						 -j[0] : j[0]) *
						moving_speed;
                }

                if (p0_units[loop_counter][1] != p0_units[loop_counter][4]) {
                    p0_units[loop_counter][1] +=
						(p0_units[loop_counter][1] > p0_units[loop_counter][4] ?
						 -j[1] : j[1]) *
						moving_speed;
                }

                var fog_counter = fog.length - 1;
                if (fog_counter >= 0) {
                    do {
                        if (Math.sqrt(Math.pow(p0_units[loop_counter][1] -
											   fog[fog_counter][1] +
											   settings['level-size'] - 50, 2) +
									  Math.pow(p0_units[loop_counter][0] -
											   fog[fog_counter][0] +
											   settings['level-size'] - 50, 2))
							< 290) {
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
					bullet_speed *
					(bullets[loop_counter][0] > bullets[loop_counter][2] ?
					 -j[0] : j[0]);
            }

            // Move bullet y.
            if (bullets[loop_counter][1] != bullets[loop_counter][3]) {
                bullets[loop_counter][1] +=
					bullet_speed *
					(bullets[loop_counter][1] > bullets[loop_counter][3] ?
					 -j[1] : j[1]);
            }

            // If bullet reaches destination(in a 10x10 area)
			// check for collisions.
            if (!in_range(10, //in 20x20 area of destination
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

function build_building(type, building_x, building_y) {
	if (type === 2) {
		if (money[0] < 250) {
			return;
		}

		money[0] -= 250;

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
	} else if (type === 3) {
		
	} else {
		console.log("Unknown Building Type", type);
	}
}

function fog_update_building() {
    var loop_counter = p0_buildings.length - 1;
    do {
        // Check if each fog unit is within 390px of a building.
        var fog_counter = fog.length - 1;
        if (fog_counter >= 0) {
            do {
                if (Math.sqrt(Math.pow(p0_buildings[loop_counter][1] -
									   fog[fog_counter][1] +
									   settings['level-size'], 2) +
							  Math.pow(p0_buildings[loop_counter][0] -
									   fog[fog_counter][0] +
									   settings['level-size'], 2)) < 390) {
                    fog.splice(
                      fog_counter,
                      1
                    );
                }
            } while(fog_counter--);
        }
    } while(loop_counter--);
}

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

function in_range(range, x0, y0, x1, y1) {
	var res = Math.abs(x0 - x1) <= range && Math.abs(y0 - y1) <= range ?
			true : false;
	if (heavy_debug_flag) {
		console.log("!in_range?", x0, y0, x1, y1);
		console.log("!in_range?", !res);
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
	u1[3] = Math.round(u1[3] - 0.7 * rand2 * (u2[0] - u1[0] + 2 * rand1)); 
	u1[4] = Math.round(u1[4] - 0.7 * rand1 * (u2[1] - u1[1] + 2 * rand2));
}

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


function world_init() {
    money = [
        3000,
        5000,
    ];

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
		1000 :
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
var bullet_speed = 12;

setmode(0);

//websocket
try {
    var sock = new WebSocket("ws://localhost:1234/sock");
    //sock.binaryType = 'blob'; // can set it to 'blob' or 'arraybuffer 
    console.log("Websocket - status: " + sock.readyState);
    sock.onopen = function(m) { 
        console.log("CONNECTION opened..." + this.readyState);
	};
    sock.onmessage = function(m) { 
        console.log(m.data);
	};
    sock.onerror = function(m) {
        console.log("Error occured sending..." + m.data);
	};
    sock.onclose = function(m) { 
        console.log("Disconnected - status " + this.readyState);
	};
} catch(exception) {
    console.log(exception);
}
