function bodyMap() {

  var rsr = Raphael('body', '380.95731', '964.03125');
  var bodyMap = rsr.set();
  var attr = {
    fill: '#f09959',
    stroke: '#666',
    'stroke-width': '1',
    "stroke-linejoin": "round"
  };
  var right_hand = rsr.path("M 50.21875 450.53125 L 27.21875 450.53125 C 27.216002 450.57417 27.15625 451.59375 27.15625 451.59375 C 24.135 460.39625 20.03125 470.3175 17 476.34375 C 10.60125 489.0475 6.72875 498.3025 5.3125 505.03125 C 3.8975 511.75625 1.05875 537.93875 0 543.25 C 0 543.25 -0.355 547.14125 3.1875 547.5 C 6.72625 547.8525 12.045 545.38375 12.28125 531.21875 C 12.28125 531.21875 14.655 516.58375 15.125 512.5625 C 15.59625 508.5525 29.995 492.5025 32.59375 489.90625 C 35.19 487.30875 40.37375 486.9675 42.5 495.34375 C 44.19 502.01875 45.325 516.13875 50.28125 517.78125 C 50.28125 517.78125 56.66625 520.615 55.25 512.125 C 54.09 505.15625 53.61375 495.46625 53.125 482 C 52.7725 472.28375 52.04875 460.41375 49.21875 455.8125 C 49.21875 455.8125 49.691328 453.17569 50.21875 450.53125 z ").attr(attr).data('id', 'right_hand');
  var right_forearm = rsr.path("M 94.0625 318.625 L 54.03125 318.625 C 53.975146 319.26405 54.005999 320.05549 53.90625 320.5625 C 52.91 325.64875 46.92375 334.52875 44.25 342.15625 C 44.25 342.15625 35.3 365.4025 32.46875 389 C 29.703257 412.04659 27.332148 448.75993 27.21875 450.53125 L 50.21875 450.53125 C 51.088996 446.16792 52.74566 439.58403 57.375 428.5625 C 64.81 410.86125 78.73 395.11125 84.625 365.875 C 87.4975 351.605 90.0475 328.06 93.8125 319.15625 C 93.896084 318.95872 93.979221 318.81995 94.0625 318.625 z ").attr(attr).data('id', 'right_forearm');
  var right_arm = rsr.path("M 110.5 153.5625 C 97.39658 157.46562 80.10453 166.01772 71.875 201.25 C 63.5 237.1225 66.21875 249.75 66.21875 249.75 C 66.21875 249.75 51.83125 279.00125 54.1875 310.65625 C 54.1875 310.65625 54.3316 315.20387 54.03125 318.625 L 94.0625 318.625 C 101.07501 302.20948 106.9991 294.67208 110.5 260.8125 L 110.5 153.5625 z ").attr(attr).data('id', 'right_arm');
  var groin = rsr.path("m 379.0625,532.78406 c 0.54457,-0.21041 1.10692,-0.37459 1.625,-0.65625 0.94523,-0.5139 1.84685,-1.14499 2.6875,-1.875 0.84065,-0.73001 1.62887,-1.54986 2.34375,-2.46875 0.71488,-0.91889 1.33832,-1.91945 1.90625,-3 0.56793,-1.08055 1.06895,-2.25376 1.46875,-3.46875 0.3998,-1.21499 0.69576,-2.4903 0.90625,-3.8125 0.21049,-1.3222 0.34375,-2.69157 0.34375,-4.09375 0,-1.40218 -0.13326,-2.77155 -0.34375,-4.09375 -0.21049,-1.3222 -0.50645,-2.59751 -0.90625,-3.8125 -0.3998,-1.21499 -0.90082,-2.35695 -1.46875,-3.4375 -0.56793,-1.08055 -1.19137,-2.08111 -1.90625,-3 -0.71488,-0.91889 -1.5031,-1.76999 -2.34375,-2.5 -0.84065,-0.73001 -1.74227,-1.3611 -2.6875,-1.875 -0.94523,-0.5139 -1.94011,-0.91694 -2.96875,-1.1875 -1.02864,-0.27056 -2.09663,-0.40625 -3.1875,-0.40625 -1.09087,0 -2.15886,0.13569 -3.1875,0.40625 -1.02864,0.27056 -2.02352,0.6736 -2.96875,1.1875 -0.94523,0.5139 -1.84685,1.14499 -2.6875,1.875 -0.84065,0.73001 -1.62887,1.58111 -2.34375,2.5 -0.71488,0.91889 -1.33832,1.91945 -1.90625,3 -0.56793,1.08055 -1.06895,2.22251 -1.46875,3.4375 -0.3998,1.21499 -0.69576,2.4903 -0.90625,3.8125 -0.21049,1.3222 -0.34375,2.69157 -0.34375,4.09375 0,1.40218 0.13326,2.77155 0.34375,4.09375 0.21049,1.3222 0.50645,2.59751 0.90625,3.8125 0.3998,1.21499 0.90082,2.3882 1.46875,3.46875 0.56793,1.08055 1.19137,2.08111 1.90625,3 0.71488,0.91889 1.5031,1.73874 2.34375,2.46875 0.84065,0.73001 1.74227,1.3611 2.6875,1.875 0.53866,0.29286 1.12027,0.47177 1.6875,0.6875 4.9e-4,-0.0309 -4.8e-4,-0.0628 0,-0.0937 0,0 2.245,0.345 4.9375,0.3125 2.21099,0.0267 3.45297,-0.16804 4.0625,-0.25 z").attr(attr).transform("t-184.52135,-50.34656").data('id', 'groin');
  var right_foot = rsr.path("M 147.53125 889.09375 L 111.96875 895.5 C 111.60156 899.38919 111.22987 903.03064 109.875 904.625 C 109.875 904.625 106.935 910.75 98.4375 919.25 C 89.94 927.7425 80.96875 939.0625 80.96875 939.0625 C 80.96875 939.0625 78.60375 940.84375 76.125 941.90625 C 73.64875 942.96875 69.165 945.65251 70.8125 950.40625 C 72.06125 954.01125 74.71875 954.3125 74.71875 954.3125 C 74.71875 954.3125 77.5525 958.9125 82.15625 957.5 C 82.15625 957.5 85.15 960.66875 91.34375 958.90625 C 91.34375 958.90625 92.76 961.025 96.125 961.375 C 99.48625 961.7262 101.78125 960.15625 101.78125 960.15625 C 101.78125 960.15625 102.9075 964.03125 109.875 964.03125 C 116.315 964.03125 119.49875 962.10875 121.09375 954.84375 C 121.09375 954.84375 126.04375 954.6637 129.9375 950.0625 C 133.835 945.45996 134.18625 940.4925 136.3125 936.59375 C 138.435 932.6925 137.74625 930.58 143.40625 924.5625 C 149.07375 918.54875 146.585 909.33 145.875 898 C 145.875 898 147.53797 895.02328 147.53125 889.09375 z ").attr(attr).data('id', 'right_foot');
  var right_lower_leg = rsr.path("M 111.125 669.03125 C 110.84284 672.76384 110.55439 676.54057 110.6875 680.28125 C 110.99875 689.12125 110.645 692.67875 108.875 701.53125 C 107.1075 710.38375 104.445 744.675 105.03125 762.28125 C 105.03125 762.28125 114.2925 833.55375 116.125 855.53125 C 118.2475 881.01625 113.66375 883.5375 112.59375 889.96875 C 112.28933 891.8013 112.14393 893.64455 111.96875 895.5 L 147.53125 889.09375 C 147.52771 885.9751 147.21264 882.28393 145.625 877.25 C 145.625 877.25 145.15375 853.15375 149.875 824.84375 C 154.595 796.51125 159.8 781.88625 161.6875 761.125 C 163.57625 740.3525 165.6275 719.58375 162.15625 704.53125 C 162.15625 704.53125 160.7525 697.6225 162.875 689.84375 C 163.85562 686.24429 165.3007 680.86094 166.625 674.875 C 165.9431 675.06181 165.24041 675.30072 164.5625 675.46875 C 162.12604 676.07266 159.72982 676.57116 157.34375 676.9375 C 154.95768 677.30384 152.58732 677.55099 150.25 677.6875 C 147.91268 677.82401 145.60271 677.83558 143.3125 677.75 C 141.02229 677.66442 138.74474 677.48741 136.5 677.1875 C 134.25526 676.88759 132.04467 676.47525 129.84375 675.96875 C 127.64283 675.46225 125.47124 674.86159 123.3125 674.15625 C 121.15376 673.45091 118.99321 672.64644 116.875 671.75 C 114.9358 670.92932 113.03154 670.00588 111.125 669.03125 z ").attr(attr).data('id', 'right_lower_leg');
  var right_upper_leg = rsr.path("M 105.15625 417.4375 C 104.67666 420.83006 104.28662 424.28706 104.09375 427.84375 C 103.14625 445.225 100.5625 478.125 100.5625 478.125 C 100.5625 478.125 99.61875 501.73375 98.25 525.53125 C 95.6425 570.7675 108.875 628.59375 108.875 628.59375 C 108.875 628.59375 113.1125 646.6475 112.40625 654.4375 C 111.99626 658.93506 111.51058 663.93048 111.125 669.03125 C 113.03154 670.00588 114.9358 670.92932 116.875 671.75 C 118.99321 672.64644 121.15376 673.45091 123.3125 674.15625 C 125.47124 674.86159 127.64283 675.46225 129.84375 675.96875 C 132.04467 676.47525 134.25526 676.88759 136.5 677.1875 C 138.74474 677.48741 141.02229 677.66442 143.3125 677.75 C 145.60271 677.83558 147.91268 677.82401 150.25 677.6875 C 152.58732 677.55099 154.95768 677.30384 157.34375 676.9375 C 159.72982 676.57116 162.12604 676.07266 164.5625 675.46875 C 165.24041 675.30072 165.9431 675.06181 166.625 674.875 C 168.17045 667.88944 169.55716 659.98272 169.9375 651.59375 C 170.6475 636.01375 174.19625 608.41625 174.90625 580.09375 C 174.90625 580.09375 184.80937 528.46292 185.53125 482.46875 C 184.96402 482.25302 184.38241 482.07411 183.84375 481.78125 C 182.89852 481.26735 181.9969 480.63626 181.15625 479.90625 C 180.3156 479.17624 179.52738 478.35639 178.8125 477.4375 C 178.09762 476.51861 177.47418 475.51805 176.90625 474.4375 C 176.33832 473.35695 175.8373 472.18374 175.4375 470.96875 C 175.1947 470.23087 175.04532 469.43562 174.875 468.65625 L 105.15625 417.4375 z ").attr(attr).data('id', 'right_upper_leg');
  var left_foot = rsr.path("M 269.0625 896.21875 L 233.40625 889.34375 C 233.4536 895.08958 235.0625 898 235.0625 898 C 234.35375 909.33 231.90125 918.54875 237.5625 924.5625 C 243.22875 930.58 242.5025 932.6925 244.625 936.59375 C 246.75 940.4925 247.105 945.45996 251 950.0625 C 254.89625 954.6637 259.84375 954.84375 259.84375 954.84375 C 261.43875 962.10875 264.625 964.03125 271.0625 964.03125 C 278.03125 964.03125 279.15625 960.15625 279.15625 960.15625 C 279.15625 960.15625 281.4525 961.7262 284.8125 961.375 C 288.17875 961.025 289.59375 958.90625 289.59375 958.90625 C 295.79 960.66875 298.8125 957.5 298.8125 957.5 C 303.41625 958.9125 306.25 954.3125 306.25 954.3125 C 306.25 954.3125 308.70625 953.93375 310.125 950.40625 C 311.5375 946.85501 307.2925 942.96875 304.8125 941.90625 C 302.33625 940.84375 299.96875 939.0625 299.96875 939.0625 C 299.96875 939.0625 291.0275 927.7425 282.53125 919.25 C 274.03125 910.75 271.0625 904.625 271.0625 904.625 C 269.79258 903.12967 269.40714 899.82129 269.0625 896.21875 z ").attr(attr).data('id', 'left_foot');
  var left_lower_leg = rsr.path("M 269.84375 668.1875 C 268.23571 669.14977 266.57859 670.28611 265 671.125 C 261.31112 673.08533 257.68728 674.71434 254.09375 675.96875 C 252.29699 676.59596 250.50887 677.12021 248.71875 677.5625 C 246.92863 678.00479 245.13868 678.34201 243.34375 678.59375 C 241.54882 678.84549 239.74871 679.00693 237.9375 679.0625 C 236.12629 679.11807 234.30769 679.08373 232.46875 678.9375 C 230.62981 678.79127 228.78439 678.54116 226.90625 678.1875 C 225.02811 677.83384 223.1163 677.37922 221.1875 676.8125 C 219.2587 676.24578 217.30341 675.56665 215.3125 674.78125 C 214.94448 674.63607 214.55787 674.43402 214.1875 674.28125 C 215.56266 680.57714 217.07532 686.10109 218.09375 689.84375 C 220.21875 697.6225 218.78125 704.53125 218.78125 704.53125 C 215.31375 719.58375 217.36 740.3525 219.25 761.125 C 221.1375 781.88625 226.3425 796.51125 231.0625 824.84375 C 235.78375 853.15375 235.3125 877.25 235.3125 877.25 C 233.68015 882.42567 233.38026 886.18991 233.40625 889.34375 L 269.0625 896.21875 C 268.86437 894.14765 268.6878 892.03989 268.34375 889.96875 C 267.27375 883.5375 262.69 881.01625 264.8125 855.53125 C 266.64625 833.55375 275.90625 762.28125 275.90625 762.28125 C 276.49875 744.675 273.8625 710.38375 272.09375 701.53125 C 270.3225 692.67875 269.97 689.12125 270.28125 680.28125 C 270.42604 676.26008 270.17368 672.18779 269.84375 668.1875 z ").attr(attr).data('id', 'left_lower_leg');
  var left_upper_leg = rsr.path("M 275.375 414.96875 L 205.3125 467.75 C 205.11202 468.85244 204.89968 469.94406 204.5625 470.96875 C 204.1627 472.18374 203.66168 473.35695 203.09375 474.4375 C 202.52582 475.51805 201.90238 476.51861 201.1875 477.4375 C 200.47262 478.35639 199.6844 479.17624 198.84375 479.90625 C 198.0031 480.63626 197.10148 481.26735 196.15625 481.78125 C 195.63817 482.06291 195.07582 482.22709 194.53125 482.4375 C 194.66262 482.4198 195.40625 482.375 195.40625 482.375 C 196.11375 528.3925 206.03125 580.09375 206.03125 580.09375 C 206.7375 608.41625 210.29 636.01375 211 651.59375 C 211.36737 659.69673 212.69672 667.456 214.1875 674.28125 C 214.55787 674.43402 214.94448 674.63607 215.3125 674.78125 C 217.30341 675.56665 219.2587 676.24578 221.1875 676.8125 C 223.1163 677.37922 225.02811 677.83384 226.90625 678.1875 C 228.78439 678.54116 230.62981 678.79127 232.46875 678.9375 C 234.30769 679.08373 236.12629 679.11807 237.9375 679.0625 C 239.74871 679.00693 241.54882 678.84549 243.34375 678.59375 C 245.13868 678.34201 246.92863 678.00479 248.71875 677.5625 C 250.50887 677.12021 252.29699 676.59596 254.09375 675.96875 C 257.68728 674.71434 261.31112 673.08533 265 671.125 C 266.57859 670.28611 268.23571 669.14977 269.84375 668.1875 C 269.44735 663.38125 268.91669 658.68828 268.53125 654.4375 C 267.825 646.6475 272.09375 628.59375 272.09375 628.59375 C 272.09375 628.59375 285.295 570.7675 282.6875 525.53125 C 281.3175 501.73375 280.375 478.125 280.375 478.125 C 280.375 478.125 277.79 445.225 276.84375 427.84375 C 276.60279 423.40424 276.04288 419.13172 275.375 414.96875 z ").attr(attr).data('id', 'left_upper_leg');
  var abdomen = rsr.path("m 375.21875,318.78406 c -3.56529,0.0108 -7.14264,0.17868 -10.71875,0.5 -3.57611,0.32132 -7.16202,0.80665 -10.75,1.4375 -3.58798,0.63085 -7.18033,1.40438 -10.78125,2.34375 -3.60092,0.93937 -7.22882,2.03437 -10.84375,3.28125 -3.61493,1.24688 -7.21376,2.63412 -10.84375,4.1875 -3.62999,1.55338 -7.29138,3.26614 -10.9375,5.125 -3.64612,1.85886 -7.27419,3.86791 -10.9375,6.03125 -0.29203,0.17246 -0.58285,0.38811 -0.875,0.5625 1.61228,9.5634 9.29388,45.64517 7.46875,52.65625 -2.27125,8.70625 -7.26625,24.7325 -5.9375,35.125 0,0 -7.41683,16.82408 -10.375,37.75 l 69.71875,51.21875 c -0.11013,-0.50394 -0.26109,-0.98079 -0.34375,-1.5 -0.21049,-1.3222 -0.34375,-2.69157 -0.34375,-4.09375 0,-1.40218 0.13326,-2.77155 0.34375,-4.09375 0.21049,-1.3222 0.50645,-2.59751 0.90625,-3.8125 0.3998,-1.21499 0.90082,-2.35695 1.46875,-3.4375 0.56793,-1.08055 1.19137,-2.08111 1.90625,-3 0.71488,-0.91889 1.5031,-1.76999 2.34375,-2.5 0.84065,-0.73001 1.74227,-1.3611 2.6875,-1.875 0.94523,-0.5139 1.94011,-0.91694 2.96875,-1.1875 1.02864,-0.27056 2.09663,-0.40625 3.1875,-0.40625 1.09087,0 2.15886,0.13569 3.1875,0.40625 1.02864,0.27056 2.02352,0.6736 2.96875,1.1875 0.94523,0.5139 1.84685,1.14499 2.6875,1.875 0.84065,0.73001 1.62887,1.58111 2.34375,2.5 0.71488,0.91889 1.33832,1.91945 1.90625,3 0.56793,1.08055 1.06895,2.22251 1.46875,3.4375 0.3998,1.21499 0.69576,2.4903 0.90625,3.8125 0.21049,1.3222 0.34375,2.69157 0.34375,4.09375 0,1.40218 -0.13326,2.77155 -0.34375,4.09375 -0.033,0.2071 -0.11902,0.38901 -0.15625,0.59375 l 70.0625,-52.78125 c -3.16759,-19.74392 -9.96875,-35.28125 -9.96875,-35.28125 1.33125,-10.3925 -3.635,-26.41875 -5.90625,-35.125 -1.80227,-6.93234 5.61148,-41.99695 7.34375,-52.0625 -0.62408,-0.39864 -1.25083,-0.86137 -1.875,-1.25 -3.51936,-2.19131 -7.03977,-4.22006 -10.5625,-6.09375 -3.52273,-1.87369 -7.03533,-3.59917 -10.5625,-5.15625 -3.52717,-1.55708 -7.06108,-2.94601 -10.59375,-4.1875 -3.53267,-1.24149 -7.08577,-2.3231 -10.625,-3.25 -3.53923,-0.9269 -7.07814,-1.69917 -10.625,-2.3125 -3.54686,-0.61333 -7.10071,-1.07423 -10.65625,-1.375 -3.55554,-0.30077 -7.09096,-0.44828 -10.65625,-0.4375 z").attr(attr).transform("t-184.52135,-50.34656").data('id', 'abdomen');
  var chest = rsr.path("m 315.59375,200.34656 c -4.23962,0.51149 -8.33906,0.16365 -12.8125,1.34375 -2.20608,0.58194 -5.03447,1.40987 -7.75,2.21875 l 0,107.25 c 0.23042,-2.22859 0.47871,-4.21708 0.6875,-6.6875 -0.87625,10.35125 0.79125,24.52 2.375,35.40625 0.0455,0.31313 0.36474,1.94339 0.4375,2.375 0.29215,-0.17439 0.58297,-0.39004 0.875,-0.5625 3.66331,-2.16334 7.29138,-4.17239 10.9375,-6.03125 3.64612,-1.85886 7.30751,-3.57162 10.9375,-5.125 3.62999,-1.55338 7.22882,-2.94062 10.84375,-4.1875 3.61493,-1.24688 7.24283,-2.34188 10.84375,-3.28125 3.60092,-0.93937 7.19327,-1.7129 10.78125,-2.34375 3.58798,-0.63085 7.17389,-1.11618 10.75,-1.4375 3.57611,-0.32132 7.15346,-0.48922 10.71875,-0.5 3.56529,-0.0108 7.10071,0.13673 10.65625,0.4375 3.55554,0.30077 7.10939,0.76167 10.65625,1.375 3.54686,0.61333 7.08577,1.3856 10.625,2.3125 3.53923,0.9269 7.09233,2.00851 10.625,3.25 3.53267,1.24149 7.06658,2.63042 10.59375,4.1875 3.52717,1.55708 7.03977,3.28256 10.5625,5.15625 3.52273,1.87369 7.04314,3.90244 10.5625,6.09375 0.62417,0.38863 1.25092,0.85136 1.875,1.25 0.0987,-0.57375 0.47422,-2.57771 0.53125,-2.96875 1.13854,-7.81985 2.30341,-17.29928 2.5625,-25.875 l 0,-3.5625 c -0.008,-2.04652 -3.5e-4,-4.12445 -0.15625,-5.96875 0.0478,0.56561 0.10731,0.97873 0.15625,1.53125 l 0,-102.21875 c -2.51816,-0.73287 -5.18567,-1.54899 -7.25,-2.09375 -4.47628,-1.1801 -8.57351,-0.83226 -12.8125,-1.34375 l -118.8125,0 z").attr(attr).transform("t-184.52135,-50.34656").data('id', 'chest');
  var left_hand = rsr.path("M 354.8125 454.21875 L 331.4375 454.21875 C 331.46424 454.464 331.71875 455.8125 331.71875 455.8125 C 328.885 460.41375 328.19375 472.28375 327.84375 482 C 327.35375 495.46625 326.87375 505.15625 325.71875 512.125 C 324.30125 520.615 330.65625 517.78125 330.65625 517.78125 C 335.6125 516.13875 336.77875 502.01875 338.46875 495.34375 C 340.595 486.9675 345.78125 487.30875 348.375 489.90625 C 350.9725 492.5025 365.36875 508.5525 365.84375 512.5625 C 366.31125 516.58375 368.65625 531.21875 368.65625 531.21875 C 368.89125 545.38375 374.20875 547.8525 377.75 547.5 C 381.2925 547.14125 380.9375 543.25 380.9375 543.25 C 379.875 537.93875 377.04375 511.75625 375.625 505.03125 C 374.21 498.3025 370.335 489.0475 363.9375 476.34375 C 361.20109 470.90813 357.70356 462.31288 354.8125 454.21875 z ").attr(attr).data('id', 'left_hand');
  var left_forearm = rsr.path("M 327.21875 321.09375 L 287.6875 321.09375 C 291.13197 330.93853 293.58882 352.36784 296.3125 365.875 C 302.20625 395.11125 316.16125 410.86125 323.59375 428.5625 C 330.18488 444.24938 331.22926 452.30883 331.4375 454.21875 L 354.8125 454.21875 C 354.49836 453.33925 354.10837 452.45648 353.8125 451.59375 C 353.8125 451.59375 351.30125 412.605 348.46875 389 C 345.6375 365.4025 336.6875 342.15625 336.6875 342.15625 C 334.09501 334.7571 328.46893 326.24369 327.21875 321.09375 z ").attr(attr).data('id', 'left_forearm');
  var left_arm = rsr.path("M 269.9375 153.4375 L 269.9375 255.65625 C 273.38864 294.61746 279.64483 301.4819 287.125 319.15625 C 287.32627 319.63222 287.49297 320.53775 287.6875 321.09375 L 327.21875 321.09375 C 327.18017 320.93482 327.06111 320.71477 327.03125 320.5625 C 326.39875 317.34125 326.78125 310.65625 326.78125 310.65625 C 329.135 279.00125 314.71875 249.75 314.71875 249.75 C 314.71875 249.75 317.43875 237.1225 309.0625 201.25 C 300.72505 165.55121 283.08979 157.26526 269.9375 153.4375 z ").attr(attr).data('id', 'left_arm');
  var neck = rsr.path("m 315.89866,200.65147 118.8125,0 c -3.22802,-0.3895 -6.51399,-1.21389 -10.1875,-3.96875 -8.4975,-6.37125 -22.78125,-18.40625 -22.78125,-18.40625 -2.83375,-2.35625 -1.90625,-20.3125 -1.90625,-20.3125 l -22.40625,0 -1.40625,0 -1.4375,0 -1.40625,0 -22.40625,0 c 0,0 0.95875,17.95625 -1.875,20.3125 0,0 -14.28125,12.035 -22.78125,18.40625 -3.67297,2.75486 -6.99025,3.57925 -10.21875,3.96875 z").attr(attr).transform("t-184.52135,-50.34656").data('id', 'neck');
  var head = rsr.path("M 191.0625 0 C 190.7775 0 190.475 0.01875 190.1875 0.03125 C 184.78875 0.08375 179.2425 0.98875 173.75 2.84375 C 156.76 8.57 150.26875 23.0325 147.90625 35.28125 C 147.08875 39.105 146.6525 43.205 146.65625 47.59375 C 146.60915 50.30162 146.68855 52.11476 146.78125 53.375 C 146.45882 53.28068 146.00541 53.183381 145.5 53.09375 C 144.98219 53.00828 144.38563 52.9375 143.78125 52.9375 C 142.85625 52.9375 141.91 53.08625 141.09375 53.5625 C 140.78703 53.741875 140.50289 53.975498 140.21875 54.28125 C 139.93472 54.58666 139.64762 54.959531 139.40625 55.375 C 139.04394 55.999082 138.74145 56.735446 138.53125 57.5625 C 138.46125 57.8378 138.42305 58.112422 138.375 58.40625 C 138.373 58.41641 138.377 58.42732 138.375 58.4375 C 138.3293 58.721957 138.27284 59.012643 138.25 59.3125 C 138.1999 59.943432 138.21505 60.594291 138.28125 61.28125 C 138.34075 61.895822 138.45632 62.509436 138.625 63.15625 C 138.6415 63.2197 138.63865 63.280054 138.65625 63.34375 C 138.75688 63.710347 138.89164 64.064024 139.03125 64.4375 C 139.16708 64.800557 139.29353 65.163645 139.46875 65.53125 C 139.64841 65.911154 139.83811 66.273682 140.0625 66.65625 C 140.49703 67.397188 140.89528 68.072834 141.21875 68.71875 C 141.5426 69.365452 141.79649 69.962803 142.03125 70.53125 C 143.21073 73.379837 143.40273 75.31979 143.96875 77.40625 C 143.99675 77.510036 144.0325 77.614266 144.0625 77.71875 C 144.1538 78.035441 144.22757 78.359161 144.34375 78.6875 C 144.47641 79.064688 144.65661 79.45031 144.84375 79.8125 C 145.21804 80.53688 145.67813 81.221675 146.21875 81.8125 C 146.75775 82.400688 147.3635 82.893452 148 83.25 C 148.15953 83.3398 148.33707 83.428513 148.5 83.5 C 148.96851 83.70556 149.45806 83.814132 149.9375 83.84375 C 149.9583 83.84505 149.9792 83.842833 150 83.84375 C 150.32257 83.85457 150.65133 83.8334 150.96875 83.75 C 151.93279 89.148 153.15066 94.81309 154.59375 98.90625 C 157.63 107.49625 165.6675 115.3525 181.15625 120.46875 L 181.25 120.625 C 184.475 123.005 188.595 123.49375 191.0625 123.46875 C 194.15875 123.63625 197.6175 123.005 200.84375 120.625 L 200.9375 120.46875 C 216.4225 115.3525 224.4675 107.49625 227.5 98.90625 C 228.95615 94.781081 230.18897 89.060342 231.15625 83.625 C 232.24721 83.846246 233.38226 83.482261 234.40625 82.78125 C 234.47519 82.734051 234.5571 82.70657 234.625 82.65625 C 234.70788 82.599683 234.79365 82.529771 234.875 82.46875 C 234.88624 82.459617 234.89504 82.446715 234.90625 82.4375 C 235.87826 81.699098 236.74692 80.660332 237.34375 79.5 C 237.53071 79.138425 237.67937 78.783438 237.8125 78.40625 C 238.42625 76.66875 238.64219 75.121563 239.125 73.28125 C 239.36575 72.369209 239.69356 71.374988 240.15625 70.25 C 240.15925 70.2419 240.15325 70.22683 240.15625 70.21875 C 240.62555 69.081758 241.25688 67.825625 242.125 66.34375 C 242.33736 65.981896 242.51521 65.609444 242.6875 65.25 C 242.6915 65.2413 242.6835 65.22745 242.6875 65.21875 C 243.21341 64.116145 243.55608 63.043716 243.75 62 C 244.33378 58.878004 243.58576 56.134779 242.40625 54.5 C 242.40125 54.4936 242.41125 54.47512 242.40625 54.46875 C 242.13613 54.097647 241.83578 53.809252 241.53125 53.5625 C 241.38253 53.44058 241.24687 53.339375 241.09375 53.25 C 240.84952 53.106831 240.60999 52.995923 240.34375 52.90625 C 239.84145 52.731946 239.30986 52.65333 238.78125 52.625 C 238.51133 52.6131 238.23164 52.61055 237.96875 52.625 C 237.44422 52.65094 236.94137 52.727578 236.5 52.8125 C 236.0577 52.89965 235.66 53.01125 235.375 53.09375 C 235.3709 53.153145 235.379 53.131191 235.375 53.1875 C 235.35622 53.192648 235.33066 53.213679 235.3125 53.21875 C 235.39511 51.933539 235.47949 50.131903 235.4375 47.59375 C 235.4375 43.205 235.00375 39.105 234.1875 35.28125 C 231.82285 23.0325 225.34 8.57 208.34375 2.84375 C 202.8575 0.98875 197.305 0.08375 191.90625 0.03125 C 191.62125 0.01875 191.35 0 191.0625 0 z ").attr(attr).data('id', 'head');

  bodyMap.push(head, neck, chest, abdomen, groin, right_arm, right_forearm, right_hand, left_arm, left_forearm, left_hand, right_upper_leg, right_lower_leg, right_foot, left_upper_leg, left_lower_leg, left_foot);
  
  return bodyMap;
}