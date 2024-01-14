import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

import { AdminLayoutRoutes } from "./admin-layout.routing";
import { DashboardComponent } from "../../pages/dashboard/dashboard.component";
import { IconsComponent } from "../../pages/icons/icons.component";
import { MapComponent } from "../../pages/map/map.component";
import { NotificationsComponent } from "../../pages/notifications/notifications.component";
import { UserComponent } from "../../pages/user/user.component";
import { PersonalComponent } from "../../pages/user/personal/personal.component";
import { ProfileComponent } from "../../pages/user/profile/profile.component";
import { TokensComponent } from "../../pages/user/tokens/tokens.component";
import { FeedComponent } from '../../pages/feed/feed.component';
import { CreatePostsComponent } from '../../pages/feed/create-posts/create-posts.component';
import { AdvertsComponent } from '../../pages/feed/posts/adverts/adverts.component';
import { PostsComponent } from '../../pages/feed/posts/posts.component';
import { DiscussionsComponent } from '../../pages/discussions/discussions.component';
import { MessagesComponent } from '../../pages/messages/messages.component';
import { HomeComponent } from '../../pages/home/home.component';


import { TablesComponent } from "../../pages/tables/tables.component";
import { TypographyComponent } from "../../pages/typography/typography.component";
// import { RtlComponent } from "../../pages/rtl/rtl.component";

import { NgbModule } from "@ng-bootstrap/ng-bootstrap";

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    HttpClientModule,
    NgbModule,
  ],
  declarations: [
    DashboardComponent,
    UserComponent,
    PersonalComponent,
    ProfileComponent,
    TokensComponent,
    FeedComponent,
    CreatePostsComponent,
    AdvertsComponent,
    PostsComponent,
    DiscussionsComponent,
    MessagesComponent,
    HomeComponent,
    TablesComponent,
    IconsComponent,
    TypographyComponent,
    NotificationsComponent,
    MapComponent,
    // RtlComponent
  ]
})
export class AdminLayoutModule {}
