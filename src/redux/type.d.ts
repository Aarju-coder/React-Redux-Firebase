export interface User {
    email: string;
    id: string;
    createdAt: any;
  }
  export interface SignInData {
    email: string;
    password: string;
  }
export interface AuthState {
    user: User | null;
    authenticated: boolean;
    loading: boolean;
    error: string;
    needVerification: boolean;
    success: string;
  }

  export interface Player{
    BonusSpinPoints: string,
    ExperienceLevel: string,
    BonusSpins: string,
    ExperiencePoints: string,
    Highscore: string,
    Id: string,
    Name: string,
    Purchased_Characters: any[],
    Purchased_Sharks: any[],
    Sandcoins: string,
    Selected_Character: string,
    Selected_Shark: string,
    IsActive: boolean,
    IsTester: boolean,
    Promocode_Used: any[]
  }
export interface PlayersArrayUtils{
  currentPage: number,
  todosPerPage: number
    fetchingData: boolean,
    selectedPlayer: Player | any,
    error: boolean;
}
export interface Charachter{
  Char_Cost: string,
  Char_Description: string,
  Char_IAP_Key_Apple: string,
  Char_IAP_Key_Google: string,
  Char_Name:string,
  Charachter_Type: string,
  Launched: boolean,
  Version: number,
  rideImageUrl: string,
  iconImageUrl: string,
  skinImageUrl: string
}
export interface CharacchtersObj {
  charArray: Charachter[],
  fetchStatus: status
   selectedChar: Charachter, 
  success:boolean,
  error: boolean,
  loader: boolean,
  isdevOrProd: number
}
export interface status{
  loading: boolean,
  success:boolean,
  error:string|null
}
export interface powerUpsDetails{
  State: boolean,
  Name: string
}
export interface powerUps{
  powerUp: powerUpsDetails[],
  status: status,
  fetchingData: boolean,
  isdevOrProduc: number
}
export interface PromoCode{
  code: string,
isAvailable :boolean,
isPublic:boolean,
rewardCoins: number
}
export interface AppPurchase{
  Item_CoinsQuantity: number,
  Item_DefaultPrice: string,
  Item_StoreKey: string,
}
export interface PromoCodeRoot{
  PromoStatus: status,
  DeleteStatus: status,
  PromoCodeStatus: status,
  CodeStatus: status,
  deleteCode: string,
  setCode: number,
  PromoDetails: PromoCode[]
}
export interface inAppPurchase{
  appPurchaseDetails : AppPurchase[],
  appStatus: status,
}
export type RootState = {
    auth: AuthState,
    players: Player[],
    playersArrayMetaData: PlayersArrayUtils
    charachters: CharacchtersObj,
    termsStatus:status,
    creditStatus: status,
    contactStatus: status,
    tutorialUploadSatatus: status,
    musicUploadStatus: status,
    inAppPurchase: inAppPurchase,
    powerUpState: powerUps,
    notificationStatus: status,
    PromoCodeRoot: PromoCodeRoot
}