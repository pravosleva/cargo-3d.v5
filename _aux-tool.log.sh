# NOTE: See also https://gist.github.com/jay-johnson/018e3f30349cf2c750af5f74d8749be8
# log="/tmp/some-common.log"
txtund=$(tput sgr 0 1)          # Underline
txtbld=$(tput bold)             # Bold
blddkg=${txtbld}$(tput setaf 0) # Dark Gray
bldred=${txtbld}$(tput setaf 1) # Red
bldblu=${txtbld}$(tput setaf 2) # Blue
bldylw=${txtbld}$(tput setaf 3) # Yellow
bldgrn=${txtbld}$(tput setaf 4) # Green
bldgry=${txtbld}$(tput setaf 5) # Gray
bldpnk=${txtbld}$(tput setaf 6) # Pink/Magenta
bldwht=${txtbld}$(tput setaf 7) # White
txtrst=$(tput sgr0)             # Reset
info=${bldwht}*${txtrst}        # Feedback
pass=${bldblu}*${txtrst}
warn=${bldred}*${txtrst}
ques=${bldblu}?${txtrst}

debug() {
  cdate=$(date '+%Y-%m-%d %H:%M:%S')
  echo "${bldwht}$cdate $@ $txtrst"
  # echo "$cdate $@" >> $log
}
 
info() {
  cdate=$(date '+%Y-%m-%d %H:%M:%S')
  echo "$cdate $@"
  # echo "$cdate $@" >> $log
}

warn() {
  cdate=$(date '+%Y-%m-%d %H:%M:%S')
  echo "${bldylw}$cdate $@ $txtrst"
  # echo "$cdate $@" >> $log
}
 
ignore() {
  cdate=$(date '+%Y-%m-%d %H:%M:%S')
  echo "${blddkg}$cdate $@ $txtrst"
  # echo "$cdate $@" >> $log
}
 
good() {
  cdate=$(date '+%Y-%m-%d %H:%M:%S')
  echo "${bldgrn}$cdate $@ $txtrst"
  # echo "$cdate $@" >> $log
}
 
err() {
  cdate=$(date '+%Y-%m-%d %H:%M:%S')
  echo "${bldred}$cdate $@ $txtrst"
  # echo "$cdate $@" >> $log
}
 
lg() {
  cdate=$(date '+%Y-%m-%d %H:%M:%S')
  echo "$cdate $@"
  # echo "$cdate $@" >> $log
}
