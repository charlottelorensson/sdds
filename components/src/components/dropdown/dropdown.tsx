import {
  Component, h, Prop, State, Element, Listen, Host
} from '@stencil/core';

@Component({
  tag: 'sdds-dropdown',
  styleUrl: 'dropdown.scss',
  shadow: true,
})
export class Dropdown {
  /** Label for dropdown with no selected item */
  @Prop() label:string;

  /** Add the value of the option to set it as default */
  @Prop() defaultOption:string;

   /** Add the value of the option to set it as default */
   @Prop() disabled:boolean;

  /** `default`, `multiselect`, `filter`, `nested` */
  @Prop() types:string = 'default';

  /** `large` (default), `small`, `medium` */
  @Prop() size:string = 'large';
  
  /** Set to true to make the width following the label text length */
  @Prop() inline:boolean = false;

  /** Position of label: `no-label` (default), `inside`, `outside` */
  @Prop() labelPosition:string = 'no-label';

  /** Support `error` state */
  @Prop() state:string = 'default'

  @State() items: Array<any> = [];
  
  @State() open: boolean = false;

  @Element() el;

  @State() node: HTMLElement;

  @State() selected:string='';

  @Listen('click', { target: 'window' })
  handleClick(ev) {
    // To stop bubble click
    ev.stopPropagation();

    const target = ev ? ev.composedPath()[0] : window.event.target[0];

    if(this.node.contains(target)) {
      this.open = !this.open;
    } else {
      this.open = false;
    }
  }

  @Listen('selectOption')
  selectOptionHandler(event: CustomEvent<any>) {
    this.selected = event.detail.label;
    this.open = false;
  }

  render() {
    return (
      <Host class={{
        'is-open': this.open,
        'sdds-dropdown-inline': this.inline
      }}>
      <div class={`sdds-dropdown`}>
        <button 
        class={`sdds-dropdown-toggle`} 
        type="button" 
        onClick={(ev)=>this.handleClick(ev)} 
        ref={(node) => this.node = node}>
          <span class="sdds-dropdown-label">{
            this.selected.length > 0 ? this.selected : this.label
          }</span>
          <svg class="sdds-dropdown-arrow" width='12' height='7' viewBox='0 0 12 7' fill='none' xmlns='http://www.w3.org/2000/svg'>
            <path d='M1 1L6 6L11 1' stroke='currentColor' stroke-width='1.25' stroke-linecap='round' stroke-linejoin='round' />
          </svg>
        </button>
        <div class="sdds-dropdown-menu">
          <slot/>
        </div>
      </div>
    </Host>
    )
  }
}
