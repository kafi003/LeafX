import { useState } from 'react';

const EnterpriseNavigation = ({ user, logout }) => {
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);

  const notifications = [
    { id: 1, title: 'New task assigned', time: '5m ago', type: 'task' },
    { id: 2, title: 'Project update', time: '1h ago', type: 'update' },
    { id: 3, title: 'Meeting reminder', time: '2h ago', type: 'reminder' },
  ];

  const toggleUserMenu = () => {
    setIsUserMenuOpen(!isUserMenuOpen);
    if (isNotificationsOpen) setIsNotificationsOpen(false);
  };

  const toggleNotifications = () => {
    setIsNotificationsOpen(!isNotificationsOpen);
    if (isUserMenuOpen) setIsUserMenuOpen(false);
  };

  return (
    <div className="enterprise-header">
      <div className="header-left">
        <div className="sidebar-logo">LeafX</div>
      </div>

      <div className="header-right">
        <div className="header-actions">
          <div className="notifications-dropdown">
            <button 
              className="notifications-button"
              onClick={toggleNotifications}
              title="Notifications"
            >
              <span>🔔</span>
              <span className="notifications-badge">3</span>
            </button>

            {isNotificationsOpen && (
              <div className="dropdown-menu notifications-menu">
                <div className="dropdown-header">
                  <h3>Notifications</h3>
                  <button className="text-button">Mark all as read</button>
                </div>
                {notifications.map(notification => (
                  <div key={notification.id} className="notification-item">
                    <div className={`notification-icon ${notification.type}`}>
                      {notification.type === 'task' && '📋'}
                      {notification.type === 'update' && '📢'}
                      {notification.type === 'reminder' && '⏰'}
                    </div>
                    <div className="notification-content">
                      <div className="notification-title">{notification.title}</div>
                      <div className="notification-time">{notification.time}</div>
                    </div>
                  </div>
                ))}
                <div className="dropdown-footer">
                  <a href="#notifications" className="text-button">View all notifications</a>
                </div>
              </div>
            )}
          </div>

          <div className="user-dropdown">
            <button 
              className="user-button"
              onClick={toggleUserMenu}
              title="User menu"
            >
              <div className="user-avatar">
                {user?.name?.charAt(0) || '👤'}
              </div>
              <span className="user-name">{user?.name}</span>
              <span className="dropdown-arrow">▼</span>
            </button>

            {isUserMenuOpen && (
              <div className="dropdown-menu user-menu">
                <div className="user-info-extended">
                  <div className="user-avatar large">
                    {user?.name?.charAt(0) || '👤'}
                  </div>
                  <div className="user-details">
                    <div className="user-name">{user?.name}</div>
                    <div className="user-email">{user?.email}</div>
                  </div>
                </div>

                <div className="menu-items">
                  <a href="#profile" className="menu-item">
                    <span>👤</span> Your Profile
                  </a>
                  <a href="#settings" className="menu-item">
                    <span>⚙️</span> Settings
                  </a>
                  <a href="#help" className="menu-item">
                    <span>❓</span> Help Center
                  </a>
                  <button 
                    className="menu-item danger"
                    onClick={() => logout({ returnTo: window.location.origin })}
                  >
                    <span>🚪</span> Sign Out
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EnterpriseNavigation;