import React from 'react';
import '../styles/baseStyles.css'
import pieceURLMap from '../pieceThemes';
import { boardColorMap } from '../boardThemes';

interface SettingsDropdownProps {
    handleSetBoardTheme: (themeName: string) => void;
    handleSetPieceTheme: (themeName: string) => void;
    hidden: boolean;
}

const SettingsDropdown = (props: SettingsDropdownProps) => {

    if (props.hidden) { return (<div></div>) }

    return (
        <div className="settings-dropdown">
            <select>Board Theme: 
                {Object.keys(boardColorMap).map((themeName) => {
                    return (
                        <option value={themeName} onClick={() => props.handleSetBoardTheme(themeName)}>{themeName}</option>
                    )}
                )}
            </select>

            <select>Piece Theme:
                {Object.keys(pieceURLMap).map((themeName) => {
                    return (
                        <option value={themeName} onClick={() => props.handleSetPieceTheme(themeName)}>{themeName}</option>
                    )}
                )}
            </select>
        </div>
    );
};

export default SettingsDropdown;