import { Routes } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { WarrantyFormComponent } from './warranty-form/warranty-form.component';
import { WarrantyDetailsComponent } from './warranty-details/warranty-details.component';

export const routes: Routes = [
    { path: 'register', component : RegisterComponent},
    { path: 'login', component : LoginComponent},
    { path: 'home', component: HomeComponent},
    { path: 'warranty-form/:serialId', component: WarrantyFormComponent },
    { path: 'warranty-details/:id', component: WarrantyDetailsComponent },
];