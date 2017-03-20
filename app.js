import Fluxible from 'fluxible';
import Application from './src/core/components/Application';
import ApplicationStore from './src/core/stores/ApplicationStore';
import RouteStore from './src/core/stores/RouteStore';
import HomeStore from './src/a9/stores/home/HomeStore';

const app = new Fluxible({
    component: Application
});

app.registerStore(RouteStore);
app.registerStore(ApplicationStore);
app.registerStore(HomeStore);

module.exports = app;
