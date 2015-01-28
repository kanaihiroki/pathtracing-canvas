define(["vector", "Ray", "radiance"], function($__0,$__2,$__4) {
  "use strict";
  if (!$__0 || !$__0.__esModule)
    $__0 = {'default': $__0};
  if (!$__2 || !$__2.__esModule)
    $__2 = {'default': $__2};
  if (!$__4 || !$__4.__esModule)
    $__4 = {'default': $__4};
  var $__1 = $__0,
      V = $__1.V,
      normalize = $__1.normalize,
      cross = $__1.cross;
  var Ray = $__2.Ray;
  var radiance = $__4.radiance;
  var camera_position = V(50.0, 52.0, 220.0),
      camera_dir = V(0.0, -0.04, -1.0),
      camera_up = V(0.0, 1.0, 0.0);
  var screen_dist = 40.0;
  function render(imageData, width, height, samples, y) {
    var screen_width = 30.0 * width / height,
        screen_height = 30.0;
    var screen_x = normalize(cross(camera_dir, camera_up)).mul(screen_width),
        screen_y = normalize(cross(screen_x, camera_dir)).mul(screen_height),
        screen_center = camera_position.add(camera_dir.mul(screen_dist));
    var ret = updateCanvas(imageData, width, y, (function(x, y) {
      var accumulated_radiance = V(0.0, 0.0, 0.0);
      {
        try {
          throw undefined;
        } catch ($sx) {
          {
            $sx = 0;
            for (; $sx < samples; ++$sx) {
              try {
                throw undefined;
              } catch (sx) {
                {
                  sx = $sx;
                  try {
                    {
                      try {
                        throw undefined;
                      } catch ($sy) {
                        {
                          $sy = 0;
                          for (; $sy < samples; ++$sy) {
                            try {
                              throw undefined;
                            } catch (sy) {
                              {
                                sy = $sy;
                                try {
                                  try {
                                    throw undefined;
                                  } catch (difference) {
                                    try {
                                      throw undefined;
                                    } catch (rad) {
                                      try {
                                        throw undefined;
                                      } catch (ray) {
                                        try {
                                          throw undefined;
                                        } catch (dir) {
                                          try {
                                            throw undefined;
                                          } catch (screen_position) {
                                            try {
                                              throw undefined;
                                            } catch (y_screen) {
                                              try {
                                                throw undefined;
                                              } catch (x_screen) {
                                                try {
                                                  throw undefined;
                                                } catch (r2) {
                                                  try {
                                                    throw undefined;
                                                  } catch (r1) {
                                                    try {
                                                      throw undefined;
                                                    } catch (rate) {
                                                      {
                                                        {
                                                          rate = (1.0 / samples);
                                                          r1 = sx * rate + rate / 2.0;
                                                          r2 = sy * rate + rate / 2.0;
                                                        }
                                                        {
                                                          x_screen = screen_x.mul((r1 + x) / width - 0.5);
                                                          y_screen = screen_y.mul((r2 + y) / height - 0.5);
                                                          screen_position = screen_center.add(x_screen.add(y_screen));
                                                        }
                                                        dir = normalize(screen_position.sub(camera_position));
                                                        {
                                                          ray = new Ray(camera_position, dir);
                                                          rad = radiance(ray, 0);
                                                          difference = rad.div(Math.pow(samples, 2));
                                                        }
                                                        accumulated_radiance = accumulated_radiance.add(difference);
                                                      }
                                                    }
                                                  }
                                                }
                                              }
                                            }
                                          }
                                        }
                                      }
                                    }
                                  }
                                } finally {
                                  $sy = sy;
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                  } finally {
                    $sx = sx;
                  }
                }
              }
            }
          }
        }
      }
      var colorArray = accumulated_radiance.x;
      return [to_int(colorArray[0]), to_int(colorArray[1]), to_int(colorArray[2]), 255];
    }));
    return ret;
  }
  function clamp(x) {
    if (x < 0.0)
      return 0.0;
    if (x > 1.0)
      return 1.0;
    return x;
  }
  var gamma = 1.0 / 2.2;
  function to_int(x) {
    var gamma_collected = Math.pow(clamp(x), gamma);
    return Math.floor(gamma_collected * 255 + 0.5);
  }
  function updateCanvas(imageData, width, y, fn) {
    {
      try {
        throw undefined;
      } catch ($x) {
        {
          $x = 0;
          for (; $x < width; ++$x) {
            try {
              throw undefined;
            } catch (x) {
              {
                x = $x;
                try {
                  try {
                    throw undefined;
                  } catch (color) {
                    {
                      color = fn(x, y);
                      {
                        try {
                          throw undefined;
                        } catch ($j) {
                          {
                            $j = 0;
                            for (; $j < 4; ++$j) {
                              try {
                                throw undefined;
                              } catch (j) {
                                {
                                  j = $j;
                                  try {
                                    $traceurRuntime.setProperty(imageData.data, x * 4 + j, color[$traceurRuntime.toProperty(j)]);
                                  } finally {
                                    $j = j;
                                  }
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                } finally {
                  $x = x;
                }
              }
            }
          }
        }
      }
    }
    return {
      imageData: imageData,
      y: y
    };
  }
  return {
    get render() {
      return render;
    },
    __esModule: true
  };
});

//# sourceMappingURL=render.js.map