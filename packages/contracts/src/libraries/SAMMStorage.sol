// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

library SAMMStorageLib {
    bytes32 constant SAMM_STORAGE_POSITION = keccak256("ito.protocol.samm.storage");

    error AlreadyInitialized();

    struct SwapRequest {
        uint256 amountIn;
        uint256 amountOut;
        uint256 timestamp;
        uint256 fee;
        address user;
        address tokenIn;
        bytes8 poolId;
        uint8 errorCode;
        bool isError;
        bool isFulfilled;
    }

    struct SAMMStorage {
        address itoProxy;
        mapping(uint256 => SwapRequest) swapRequests;
    }

    function sammStorage() internal pure returns (SAMMStorage storage os) {
        bytes32 position = SAMM_STORAGE_POSITION;
        assembly {
            os.slot := position
        }
    }

    function initSAMMStorage(address _itoProxy) internal {
        SAMMStorage storage ss = sammStorage();
        if (ss.itoProxy != address(0)) {
            revert AlreadyInitialized();
        }
        ss.itoProxy = _itoProxy;
    }
}
