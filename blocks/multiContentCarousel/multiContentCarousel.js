/* Components to Add 

Carousel
title/header
Activity details
Tabs */

export default function decorate(block) {  
    // Initialize Carousel  
    const buttons = document.createElement('div');  
    buttons.className = 'carousel-buttons';  
    
    [...block.children].forEach((row, i) => {  
      const classes = ['image', 'text'];  
      classes.forEach((e, j) => {  
        row.children[j]?.classList.add(`carousel-${e}`);  
      });  
    
      // Create carousel navigation buttons  
      const button = document.createElement('button');  
      button.title = 'Carousel Nav';  
      if (!i) button.classList.add('selected');  
      button.addEventListener('click', () => {  
        block.scrollTo({ top: 0, left: row.offsetLeft - row.parentNode.offsetLeft, behavior: 'smooth' });  
        [...buttons.children].forEach((r) => r.classList.remove('selected'));  
        button.classList.add('selected');  
      });  
      buttons.append(button);  
    });  
    block.parentElement.append(buttons);  
    
    // Initialize Activity Details  
    const activityDetailsBlocks = document.querySelectorAll('.activity-details-container');  
    activityDetailsBlocks.forEach((block) => {  
      const dl = document.createElement('dl');  
      [...block.children].forEach((row) => {  
        const dt = document.createElement('dt');  
        const dd = document.createElement('dd');  
        dt.append(...row.firstElementChild.childNodes);  
        dd.append(...row.lastElementChild.childNodes);  
        dl.append(dt, dd);  
      });  
      block.replaceChildren(dl);  
    });  
    
    // Initialize Tabs  
    const tabBlocks = document.querySelectorAll('.tabs');  
    tabBlocks.forEach(($block) => {  
      const tabs = createTabs($block);  
      if (!tabs) return;  
    
      const $wrapper = $block.parentElement;  
      const $container = $wrapper.parentElement;  
      $container.insertBefore($wrapper, $container.firstElementChild);  
    
      tabs.forEach((tab, index) => {  
        const $button = document.createElement('button');  
        const { $tab, title, name } = tab;  
        $button.textContent = title;  
        $tab.replaceChildren($button);  
    
        $button.addEventListener('click', () => {  
          const $activeButton = $block.querySelector('button.active');  
          const blockPosition = $block.getBoundingClientRect().top;  
          const offsetPosition = blockPosition + window.scrollY - 80;  
    
          if ($activeButton !== $tab) {  
            $activeButton.classList.remove('active');  
            $button.classList.add('active');  
    
            tabs.forEach((t) => {  
              if (name === t.name) {  
                t.$content.classList.remove('hidden');  
              } else {  
                t.$content.classList.add('hidden');  
              }  
              window.scrollTo({ top: offsetPosition, behavior: 'smooth' });  
            });  
          }  
        });  
    
        if (index === 0) {  
          $button.classList.add('active');  
          tab.$content.classList.remove('hidden');  
        }  
      });  
    });  


  }  
    
  /** * @typedef TabInfo * @property {string} name * @property {HTMLElement} $tab * @property {HTMLElement} $content */  
  /** * @param {HTMLElement} $

  /**  
 * @typedef TabInfo  
 * @property {string} name  
 * @property {HTMLElement} $tab  
 * @property {HTMLElement} $content  
 */  
  
/**  
 * @param {HTMLElement} $block  
 * @return {TabInfo[]}  
 */  
export function createTabs($block) {  
    const $ul = $block.querySelector('ul');  
    if (!$ul) {  
      return null;  
    }  
    
    /** @type TabInfo[] */  
    const tabs = [...$ul.querySelectorAll('li')].map(($li) => {  
      const title = $li.textContent;  
      const name = title.toLowerCase().trim();  
      return {  
        title,  
        name,  
        $tab: $li,  
      };  
    });  
    
    // Move $ul below section div  
    $block.replaceChildren($ul);  
    
    // Search referenced sections and move them inside the tab-container  
    const $wrapper = $block.parentElement;  
    const $container = $wrapper.parentElement;  
    const $sections = document.querySelectorAll('[data-tab]');  
    
    // Move the tab's sections before the tab riders  
    [...$sections].forEach(($tabContent) => {  
      const name = $tabContent.dataset.tab.toLowerCase().trim();  
      /** @type TabInfo */  
      const tab = tabs.find((t) => t.name === name);  
      if (tab) {  
        const $el = document.createElement('div');  
        $el.classList.add('tab-item');  
        $el.append(...$tabContent.children);  
        $el.classList.add('hidden');  
        $container.insertBefore($el, $wrapper);  
        $tabContent.remove();  
        tab.$content = $el;  
      }  
    });  
    
    return tabs;  
  }  
    
  /**  
   * @param {HTMLElement} $block  
   */  
  export default function decorate($block) {  
    const tabs = createTabs($block);  
    if (!tabs) return;  
    
    // Move the tab riders in front  
    const $wrapper = $block.parentElement;  
    const $container = $wrapper.parentElement;  
    $container.insertBefore($wrapper, $container.firstElementChild);  
    
    tabs.forEach((tab, index) => {  
      const $button = document.createElement('button');  
      const { $tab, title, name } = tab;  
      $button.textContent = title;  
      $tab.replaceChildren($button);  
    
      $button.addEventListener('click', () => {  
        const $activeButton = $block.querySelector('button.active');  
        const blockPosition = $block.getBoundingClientRect().top;  
        const offsetPosition = blockPosition + window.scrollY - 80;  
    
        if ($activeButton !== $tab) {  
          $activeButton.classList.remove('active');  
          $button.classList.add('active');  
    
          tabs.forEach((t) => {  
            if (name === t.name) {  
              t.$content.classList.remove('hidden');  
            } else {  
              t.$content.classList.add('hidden');  
            }  
          });  
    
          window.scrollTo({  
            top: offsetPosition,  
            behavior: 'smooth',  
          });  
        }  
      });  
    
      if (index === 0) {  
        $button.classList.add('active');  
        tab.$content.classList.remove('hidden');  
      }  
    });  
  }  
  
  