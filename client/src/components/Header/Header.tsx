import logo from '../../assets/images/logo.svg';
import unitsIcon from '../../assets/images/icon-units.svg';
import dropDown from '../../assets/images/icon-dropdown.svg';
import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { setPrecipUnit, setTempUnit, setWindUnit } from '../../features/units/unitsSlice';

const Header = () => {
  const dispatch = useAppDispatch();
  const { tempUnit, windUnit, precipUnit } = useAppSelector((state) => state.units);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleToggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  const setTUnit = (unit: 'C' | 'F') => {
    dispatch(setTempUnit(unit));
    setIsMenuOpen(false);
  };

  const setWUnit = (unit: 'kmh' | 'mph') => {
    dispatch(setWindUnit(unit));
    setIsMenuOpen(false);
  };

  const setPUnit = (unit: 'mm' | 'in') => {
    dispatch(setPrecipUnit(unit));
    setIsMenuOpen(false);
  };

  return (
    <header>
      <img className="logo" src={logo} alt="Weather app logo" />
      <div className="units-container">
        <button className="units-btn" type="button" onClick={handleToggleMenu}>
          <img src={unitsIcon} alt="units icon" />
          Units
          <img src={dropDown} alt="dropdown" />
        </button>

        <div className={`menu-modal ${isMenuOpen ? '' : 'hidden'}`}>
          <div className="temp-modal">
            <p>Temperature</p>
            <button
              className={tempUnit === 'C' ? 'active' : ''}
              type="button"
              onClick={() => setTUnit('C')}
            >
              Celsius
            </button>
            <button
              className={tempUnit === 'F' ? 'active' : ''}
              type="button"
              onClick={() => setTUnit('F')}
            >
              Fahrenheit
            </button>
          </div>

          <div className="wind-modal">
            <p>Wind speed</p>
            <button
              className={windUnit === 'kmh' ? 'active' : ''}
              type="button"
              onClick={() => setWUnit('kmh')}
            >
              km/h
            </button>
            <button
              className={windUnit === 'mph' ? 'active' : ''}
              type="button"
              onClick={() => setWUnit('mph')}
            >
              mph
            </button>
          </div>

          <div className="precipitation-modal">
            <p>Precipitation</p>
            <button
              className={precipUnit === 'mm' ? 'active' : ''}
              type="button"
              onClick={() => setPUnit('mm')}
            >
              mm
            </button>
            <button
              className={precipUnit === 'in' ? 'active' : ''}
              type="button"
              onClick={() => setPUnit('in')}
            >
              in
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
