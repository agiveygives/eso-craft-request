import { Configuration } from '../pages/Configuration';
import { CraftRequests } from '../pages/CraftRequests';
import { Metrics } from '../pages/Metrics';

const navigationLinks = [
  { location: '/configuration', label: 'Configuration', component: Configuration },
  { location: '/requests', label: 'Craft Requests', component: CraftRequests },
  { location: '/metrics', label: 'Metrics', component: Metrics },
];

export default navigationLinks;
