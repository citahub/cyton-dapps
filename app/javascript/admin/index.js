import Rails from 'rails-ujs';

// import "bootstrap";
import "bootstrap-material-design";

import ClipboardJS from "clipboard";

import 'material-design-icons';

import './stylesheets'

Rails.start();

$(document).ready(() => {
  let clipboard = new ClipboardJS('.clipboard-btn');

  $('.img-pop').popover({
    html: true,
    trigger: 'hover'
  })
});
