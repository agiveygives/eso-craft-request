import { Configuration } from '../pages/Configuration';
import { CraftRequests } from '../pages/CraftRequests';

const navigationLinks = [
  { location: '/configuration', label: 'Configuration', component: Configuration },
  { location: '/requests', label: 'Craft Requests', component: CraftRequests },
];

export default navigationLinks;
