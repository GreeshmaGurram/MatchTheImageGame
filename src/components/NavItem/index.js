import './index.css'

const NavItem = props => {
  const {tab, onNavButtonClicked, activeTab} = props

  const onNavItemChanged = () => {
    onNavButtonClicked(tab.tabId)
  }

  const activeClassName =
    tab.tabId === activeTab ? `nav-item active-nav` : `nav-item`

  return (
    <li onClick={onNavItemChanged} className={activeClassName}>
      <h1 className="nav-text">{tab.displayText}</h1>
    </li>
  )
}

export default NavItem
