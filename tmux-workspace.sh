#!/bin/sh

session="stemp-workspace"

# Check if the session exists, discarding output
# We can check $? for the exit status (zero for success, non-zero for failure)
tmux has-session -t $session 2>/dev/null

if [ $? != 0 ]; then
  # Create new detached session
  tmux new-session -d -n "develop" -s $session -x $(tput cols) -y $(tput lines)

  # vim window
  tmux send-keys "vim" C-m
  tmux rename-window 'vim'

  # Test window
  tmux new-window -n test

  # Select vim window
  tmux select-window -t vim
fi

# Attach to created session
tmux attach-session -t $session
