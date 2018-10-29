import { createFeatureSelector } from '@ngrx/store';
import { UserInfoState } from './user-info.reducer';

// Lookup the 'UserInfo' feature state managed by NgRx
const getUserInfoState = createFeatureSelector<UserInfoState>('userInfo');
