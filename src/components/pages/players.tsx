import { useEffect } from "react";
import { setPlayerBlock, setUserTester } from "../../redux/players/api";
import { Player, RootState } from "../../redux/type";
import { useDispatch, useSelector } from "react-redux";
import { playersArray } from "../../redux/players/selectors";
import { PageMetaData } from "../../redux/PlayerPageState/selectors";
import { setPlayerSelected, setcurrent } from "../../redux/PlayerPageState/action";
export type playerData = {
  playerData: [];
}

export default function PlayerPage() {
  const data = useSelector<RootState, RootState["players"]>(playersArray);
  const dispatch = useDispatch();
  const { currentPage, fetchingData, todosPerPage } = useSelector<RootState, RootState["playersArrayMetaData"]>(PageMetaData);
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(data.length / todosPerPage); i++) {
    pageNumbers.push(i);
  }

  let indexOfLastTodo = currentPage * todosPerPage;
  let indexOfFirstTodo = indexOfLastTodo - todosPerPage;
  let currentTodos = data.slice(indexOfFirstTodo, indexOfLastTodo);
  function handleClick(event: any) {

    dispatch(setcurrent(Number(event.target.id)))

  }
  const renderPageNumbers = pageNumbers.map(number => {
    return (

      <span
        key={number}
        id={String(number)}
        onClick={(e) => handleClick(e)}
      >
        {number}
      </span>
    );
  });
  useEffect(() => {
    indexOfLastTodo = currentPage * todosPerPage;
    indexOfFirstTodo = indexOfLastTodo - todosPerPage;
    currentTodos = data.slice(indexOfFirstTodo, indexOfLastTodo);
  }, [currentPage])

  function setPlayerSelect(num: Player) {
    console.log("Players selected ", num);
    dispatch(setPlayerSelected(num))
  }
  return (

    <main>
      <div className="container-fluid px-4" >
        <div className="innerPageContent mb-5 d-lg-none">
          <h1 className="pageTitle">Players</h1>
        </div>
        <div className="mb-4">
          <div className="table-responsive">
            <table className="table">
              <thead>
                <tr>
                  <th>Player Name</th>
                  <th>Email</th>
                  <th>Contact</th>
                  <th>Status</th>
                  <th>Tester/User</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>

                {currentTodos.map((player) => (

                  <tr key={player.Id}>
                    <td>
                      {player.Name}</td>
                    <td>{"name@none.com"}</td>
                    <td>{'facebook.com'}</td>
                    <td><span className="status"></span>{player.IsActive ? "Active" : "Blocked"}</td>
                    <td><span className="status"></span>{player.IsTester ? "Tester" : "User"}</td>
                    <td>
                      <div className="dropdown">
                        <button className="btn btn-secondary dropdown-toggle p-0 bg-transparent border-0" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                          <img src="/assets/img/menu.png" alt="menu"/>
                        </button>
                        <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1" onClick={() => setPlayerSelect(player)}>
                          <li><button className="dropdown-item modalBtn" data-bs-toggle="modal" data-bs-target="#playerData"  >Player Data</button></li>
                          <li>{player.IsActive ? <a className="dropdown-item " href="#" onClick={() => dispatch(setPlayerBlock(false, player))}>Block</a> :
                            <a className="dropdown-item active" href="#" onClick={() => dispatch(setPlayerBlock(false, player))}>Block</a>}</li>
                          <li>{!player.IsActive ? <a className="dropdown-item " href="#" onClick={() => dispatch(setPlayerBlock(true, player))}>Unblock</a>
                            : <a className="dropdown-item active" href="#" onClick={() => dispatch(setPlayerBlock(true, player))}>Unblock</a>}</li>
                          <li>{player.IsTester ? <a className="dropdown-item " href="#" onClick={() => dispatch(setUserTester(false, player))}>User</a> :
                            <a className="dropdown-item active" href="#" onClick={() => dispatch(setUserTester(false, player))}>User</a>}</li>
                          <li>{!player.IsTester ? <a className="dropdown-item " href="#" onClick={() => dispatch(setUserTester(true, player))}>Tester</a>
                            : <a className="dropdown-item active" href="#" onClick={() => dispatch(setUserTester(true, player))}>Tester</a>}</li>
                        </ul>
                      </div>
                    </td>
                  </tr>
                ))}
                {fetchingData && <tr><td>Loading...</td></tr>}
                <span>Pg.{renderPageNumbers}</span>
              </tbody>
            </table>

            {/* <button className="btn" onClick={nextDocuments} disabled={!lastDocument}>More Users...</button> */}
          </div>
        </div>
      </div>
    </main>


  );
}
