/**
 * PageClip Configuration
 * 
 * This file contains constants related to the PageClip integration.
 * If you need to change your PageClip site key or form name, update them here.
 */

// Replace with your own PageClip site key
export const PAGECLIP_SITE_KEY = "C1bewvluQWDvWrs3QM4nXnu7fS45oQSz";

// Form names
export const CONTACT_FORM_NAME = "contact-form";

// URLs for PageClip resources
export const PAGECLIP_SCRIPT_URL = "https://s.pageclip.co/v1/pageclip.js";
export const PAGECLIP_CSS_URL = "https://s.pageclip.co/v1/pageclip.css";

// Helper to get the full form action URL
export const getFormActionUrl = (formName: string = CONTACT_FORM_NAME) => 
  `https://send.pageclip.co/${PAGECLIP_SITE_KEY}/${formName}`; 