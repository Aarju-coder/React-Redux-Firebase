import { useSelector } from "react-redux";
import { RootState } from "../../redux/type";
import { PageMetaData } from "../../redux/PlayerPageState/selectors";


export default function PlayerDataPopup() {
  const { selectedPlayer } = useSelector<RootState, RootState["playersArrayMetaData"]>(PageMetaData);

  return (
    <div className="modal fade" id="playerData" aria-labelledby="editProfileLabel" aria-hidden="true">
      <div className="modal-dialog modal-dialog-scrollable">
        <div className="modal-content">
          <div className="modal-header border-0 px-4">
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div className="modal-body">
            <ul key={selectedPlayer.Id}>
              <li>User Id = {selectedPlayer.Id}</li>
              <li>Name = {selectedPlayer.Name}</li>
              <li>Highscore = {selectedPlayer.Highscore}</li>
              <li>Active = {selectedPlayer.IsActive ? "True" : "False"}</li>
              <li>Tester = {selectedPlayer.IsTester  ? "True" : "False"}</li>
              <li>ExperiencePoints = {selectedPlayer.ExperiencePoints}</li>
              <li>BonusSpins = {selectedPlayer.BonusSpins}</li>
              <li>ExperienceLevel = {selectedPlayer.ExperienceLevel}</li>
              <li>BonusSpinPoints = {selectedPlayer.BonusSpinPoints}</li>
              <li>Sandcoins = {selectedPlayer.Sandcoins}</li>
              <li>Selected Shark = {selectedPlayer.Selected_Shark}</li>
              <li>Selected Character = {selectedPlayer.Selected_Character}</li>
              <li>Purchased Sharks = {selectedPlayer.Purchased_Sharks?.length ?  selectedPlayer.Purchased_Sharks.map((shark: any) => (<span>{shark}</span>)) : "No Sharks Purchased"}</li>
              <li>Purchased Characters = {selectedPlayer.Purchased_Characters?.length ? selectedPlayer.Purchased_Characters.map((charachter: any) => { <span>{charachter}</span> }) : "No Characters Purchased"}</li>
              <li>Promocode Used = {selectedPlayer.Promocode_Used?.length ? selectedPlayer.Promocode_Used.map((promo : any) => { <span>{promo}</span>}) : "No Promocode Used"}</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
