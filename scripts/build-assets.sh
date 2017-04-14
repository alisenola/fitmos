#!/bin/bash

build_icon () {
  local icon=$1
  local width=$2
  local height=$3

  $(npm bin)/svgexport assets/svgs/$icon.svg assets/img/icons/$icon.png $width:$height & \
  $(npm bin)/svgexport assets/svgs/$icon.svg assets/img/icons/$icon@2x.png $(($width * 2)):$(($height * 2)) & \
  $(npm bin)/svgexport assets/svgs/$icon.svg assets/img/icons/$icon@3x.png $(($width * 3)):$(($height * 3)) & \
  wait
}

build_icon logo_splash 383 333 & \
build_icon expert_icon 94 94 & \
build_icon attendee_icon 94 94 & \
build_icon logo_nav 64 51 & \
build_icon search 47 47 & \
build_icon add_active 25 25 & \
build_icon add_inactive 25 25 & \
build_icon classes_active 25 19 & \
build_icon classes_inactive 25 19 & \
build_icon my_classes_active 25 19 & \
build_icon my_classes_inactive 25 19 & \
build_icon fav_active 19 25 & \
build_icon fav_inactive 19 25 & \
build_icon profile_active 21 25 & \
build_icon profile_inactive 21 25 & \
build_icon signed 21 25 & \
build_icon star 40 38 & \
build_icon star_half 40 38 & \
build_icon star_outline 40 38 & \
build_icon chevron_left 15 24 & \
build_icon chevron_right 15 24 & \
build_icon more_horiz 32 8 & \
build_icon data_arrow_drop_down 48 48 & \
build_icon add_photo 192 192 & \
build_icon rate_star_outline 54 51 & \
build_icon rate_star 54 51 & \
build_icon settings 40 40 & \
build_icon exit_to_app 36 36 & \
build_icon drive_document 36 36 & \
build_icon faq 36 36 & \
build_icon fullscreen 36 36 & \
build_icon fullscreen_shrink 36 36 & \
build_icon play_arrow 24 24 & \
build_icon pause 24 24 & \
build_icon visibility 44 30 & \
build_icon visibility_violet 44 30 & \
wait
