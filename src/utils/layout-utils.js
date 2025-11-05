// Layout Utilities - CSS Constraint Mapping Functions

/**
 * Maps constraint objects to CSS properties
 * @param {Object} constraints - Constraint object with horizontal, vertical, width, height
 * @returns {Object} CSS properties object
 */
export function mapConstraintsToCSS(constraints) {
  const css = {};
  
  // Horizontal constraints
  if (constraints.horizontal === 'left') {
    css['margin-right'] = 'auto';
  } else if (constraints.horizontal === 'center') {
    css['margin-left'] = 'auto';
    css['margin-right'] = 'auto';
  } else if (constraints.horizontal === 'right') {
    css['margin-left'] = 'auto';
  } else if (constraints.horizontal === 'left-right' || constraints.horizontal === 'scale') {
    css['width'] = '100%';
  }
  
  // Vertical constraints
  if (constraints.vertical === 'top') {
    css['margin-bottom'] = 'auto';
  } else if (constraints.vertical === 'center') {
    css['margin-top'] = 'auto';
    css['margin-bottom'] = 'auto';
  } else if (constraints.vertical === 'bottom') {
    css['margin-top'] = 'auto';
  } else if (constraints.vertical === 'top-bottom' || constraints.vertical === 'scale') {
    css['height'] = '100%';
  }
  
  // Width modes
  if (constraints.width) {
    if (constraints.width.mode === 'hug-contents') {
      css['width'] = 'fit-content';
    } else if (constraints.width.mode === 'fixed') {
      css['width'] = `${constraints.width.value}px`;
    } else if (constraints.width.mode === 'fill-container') {
      css['width'] = '100%';
      if (constraints.width.min !== null) {
        css['min-width'] = `${constraints.width.min}px`;
      }
      if (constraints.width.max !== null) {
        css['max-width'] = `${constraints.width.max}px`;
      }
    }
  }
  
  // Height modes
  if (constraints.height) {
    if (constraints.height.mode === 'hug-contents') {
      css['height'] = 'fit-content';
    } else if (constraints.height.mode === 'fixed') {
      css['height'] = `${constraints.height.value}px`;
    } else if (constraints.height.mode === 'fill-container') {
      css['height'] = '100%';
      if (constraints.height.min !== null) {
        css['min-height'] = `${constraints.height.min}px`;
      }
      if (constraints.height.max !== null) {
        css['max-height'] = `${constraints.height.max}px`;
      }
    }
  }
  
  return css;
}

/**
 * Maps overflow specifications to CSS
 * @param {Object} overflow - Overflow object with horizontal, vertical, clipping
 * @returns {Object} CSS properties object
 */
export function mapOverflowToCSS(overflow) {
  const css = {};
  
  if (overflow.horizontal === overflow.vertical) {
    css['overflow'] = overflow.horizontal;
  } else {
    css['overflow-x'] = overflow.horizontal;
    css['overflow-y'] = overflow.vertical;
  }
  
  if (overflow.clipping) {
    css['clip-path'] = 'inset(0)';
  }
  
  return css;
}

/**
 * Maps text truncation properties to CSS classes
 * @param {Object} text - Text properties object
 * @returns {Array} Array of CSS class names
 */
export function mapTextTruncationToCSS(text) {
  const classes = [];
  
  if (text.truncation === 'ellipsis') {
    classes.push('text-truncate');
  } else if (text.truncation === 'clip') {
    classes.push('text-clip');
  } else if (text.truncation === 'wrap') {
    classes.push('text-wrap');
  }
  
  if (text.maxLines && text.maxLines > 1) {
    classes.push(`text-clamp-${text.maxLines}`);
  }
  
  // Always add min-width: 0 for flex children that need truncation
  if (text.truncation !== 'none') {
    classes.push('min-w-0');
  }
  
  return classes;
}

/**
 * Maps auto-layout properties to flexbox CSS
 * @param {Object} layout - Layout object with type, direction, alignment, padding, gap
 * @returns {Object} CSS properties object
 */
export function mapAutoLayoutToFlexbox(layout) {
  const css = {};
  
  if (layout.type === 'auto-layout') {
    css['display'] = 'flex';
    
    // Direction
    if (layout.direction === 'horizontal') {
      css['flex-direction'] = 'row';
    } else if (layout.direction === 'vertical') {
      css['flex-direction'] = 'column';
    }
    
    // Alignment (children alignment)
    if (layout.alignment && layout.alignment.children) {
      const align = layout.alignment.children;
      if (layout.direction === 'horizontal') {
        // Horizontal direction: align-items controls cross-axis (vertical)
        if (align === 'start' || align === 'left') {
          css['align-items'] = 'flex-start';
        } else if (align === 'center') {
          css['align-items'] = 'center';
        } else if (align === 'end' || align === 'right') {
          css['align-items'] = 'flex-end';
        } else if (align === 'space-between') {
          css['justify-content'] = 'space-between';
        } else if (align === 'stretch') {
          css['align-items'] = 'stretch';
        }
      } else {
        // Vertical direction: justify-content controls main-axis (vertical)
        if (align === 'start' || align === 'top') {
          css['justify-content'] = 'flex-start';
        } else if (align === 'center') {
          css['justify-content'] = 'center';
        } else if (align === 'end' || align === 'bottom') {
          css['justify-content'] = 'flex-end';
        } else if (align === 'space-between') {
          css['justify-content'] = 'space-between';
        } else if (align === 'stretch') {
          css['align-items'] = 'stretch';
        }
      }
    }
    
    // Padding
    if (layout.padding) {
      const p = layout.padding;
      if (p.top === p.right && p.right === p.bottom && p.bottom === p.left) {
        css['padding'] = `${p.top}px`;
      } else if (p.top === p.bottom && p.left === p.right) {
        css['padding'] = `${p.top}px ${p.right}px`;
      } else {
        css['padding'] = `${p.top}px ${p.right}px ${p.bottom}px ${p.left}px`;
      }
    }
    
    // Gap
    if (layout.gap !== null && layout.gap !== undefined) {
      css['gap'] = `${layout.gap}px`;
    }
  }
  
  return css;
}

/**
 * Converts a layout specification object to CSS properties object
 * @param {Object} spec - Complete layout specification object
 * @returns {Object} Combined CSS properties object
 */
export function layoutSpecToCSS(spec) {
  const css = {};
  
  // Map layout properties
  if (spec.layout) {
    Object.assign(css, mapAutoLayoutToFlexbox(spec.layout));
  }
  
  // Map constraints
  if (spec.constraints) {
    Object.assign(css, mapConstraintsToCSS(spec.constraints));
  }
  
  // Map overflow
  if (spec.overflow) {
    Object.assign(css, mapOverflowToCSS(spec.overflow));
  }
  
  return css;
}

