// SPDX-License-Identifier: MIT
pragma solidity ^0.8.1;

import "@openzeppelin/contracts/token/ERC20/presets/ERC20PresetMinterPauser.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Capped.sol";

contract TPFToken is ERC20Capped, ERC20PresetMinterPauser {
  constructor( 
        string memory name,
        string memory symbol,
        uint256 initialSupply,
        address owner
        ) 
        ERC20Capped(initialSupply)
        ERC20PresetMinterPauser(name, symbol) 
        {
           
        }
  
  function _mint(address account, uint256 amount) internal override(ERC20Capped, ERC20) {        
        super._mint(account, amount);
    }

  function _beforeTokenTransfer(
        address from,
        address to,
        uint256 amount
    ) internal override(ERC20PresetMinterPauser, ERC20){
        super._beforeTokenTransfer(from, to, amount);
    }
}
