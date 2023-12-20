// En FontAwesomeLibrary.js
import { library } from '@fortawesome/fontawesome-svg-core';
import { faWineBottle,faBeerMugEmpty,faWineGlass} from '@fortawesome/free-solid-svg-icons';

// Agrega los iconos que necesitas cargar inicialmente
library.add(faWineBottle,faBeerMugEmpty,faWineGlass);

const fontAwesomeLibrary = {
  faWineBottle,
  faBeerMugEmpty,
  faWineGlass
};

export default fontAwesomeLibrary;
