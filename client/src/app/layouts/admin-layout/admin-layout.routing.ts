import { HomeComponent } from './../../pages/home/home.component';
import { Routes } from "@angular/router";

import { DashboardComponent } from "../../pages/dashboard/dashboard.component";
import { IconsComponent } from "../../pages/icons/icons.component";
import { MapComponent } from "../../pages/map/map.component";
import { NotificationsComponent } from "../../pages/notifications/notifications.component";
import { UserComponent } from "../../pages/user/user.component";
import { TablesComponent } from "../../pages/tables/tables.component";
import { TypographyComponent } from "../../pages/typography/typography.component";
import { TokensComponent } from 'src/app/pages/user/tokens/tokens.component';
import { DiscussionsComponent } from 'src/app/pages/discussions/discussions.component';
import { MessagesComponent } from 'src/app/pages/messages/messages.component';
import { DiscussionPageComponent } from 'src/app/pages/discussion-page/discussion-page.component';

// import { RtlComponent } from "../../pages/rtl/rtl.component";

export const AdminLayoutRoutes: Routes = [
  { path: "home", component: HomeComponent },
  // { path: "explore", component: },
  { path: "messages", component: MessagesComponent },
  { path: "notification", component: NotificationsComponent },
  // { path: "connections", component:  },
  { path: "forum", component: DiscussionsComponent },
  { path: "discussion/:id", component: DiscussionPageComponent },
  { path: "notifications", component: NotificationsComponent },
  { path: "connextokens", component: TokensComponent },
  { path: "dashboard", component: DashboardComponent },
  { path: "icons", component: IconsComponent },
  { path: "maps", component: MapComponent },
  { path: "notifications", component: NotificationsComponent },
  { path: "user", component: UserComponent },
  { path: "tables", component: TablesComponent },
  { path: "typography", component: TypographyComponent },
  // { path: "rtl", component: RtlComponent }
];
