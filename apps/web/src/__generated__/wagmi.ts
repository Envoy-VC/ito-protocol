import {
  createUseReadContract,
  createUseWriteContract,
  createUseSimulateContract,
  createUseWatchContractEvent,
} from "wagmi/codegen";

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// ItoProxy
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const itoProxyAbi = [
  {
    type: "constructor",
    inputs: [
      { name: "_contractOwner", internalType: "address", type: "address" },
      { name: "_diamondCutFacet", internalType: "address", type: "address" },
      { name: "_ownershipFacet", internalType: "address", type: "address" },
    ],
    stateMutability: "payable",
  },
  { type: "fallback", stateMutability: "payable" },
  { type: "receive", stateMutability: "payable" },
  { type: "error", inputs: [], name: "AlreadyInitialized" },
  {
    type: "error",
    inputs: [
      {
        name: "_initializationContractAddress",
        internalType: "address",
        type: "address",
      },
      { name: "_calldata", internalType: "bytes", type: "bytes" },
    ],
    name: "InitializationFunctionReverted",
  },
] as const;

export const itoProxyAddress =
  "0x6E85056eb08D248Ee516bE85818EE5a4ca0b0223" as const;

export const itoProxyConfig = {
  address: itoProxyAddress,
  abi: itoProxyAbi,
} as const;

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// ItoToken
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const itoTokenAbi = [
  {
    type: "constructor",
    inputs: [
      { name: "initialOwner", internalType: "address", type: "address" },
    ],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    inputs: [],
    name: "DOMAIN_SEPARATOR",
    outputs: [{ name: "", internalType: "bytes32", type: "bytes32" }],
    stateMutability: "view",
  },
  {
    type: "function",
    inputs: [
      { name: "owner", internalType: "address", type: "address" },
      { name: "spender", internalType: "address", type: "address" },
    ],
    name: "allowance",
    outputs: [{ name: "", internalType: "uint256", type: "uint256" }],
    stateMutability: "view",
  },
  {
    type: "function",
    inputs: [
      { name: "spender", internalType: "address", type: "address" },
      { name: "value", internalType: "uint256", type: "uint256" },
    ],
    name: "approve",
    outputs: [{ name: "", internalType: "bool", type: "bool" }],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    inputs: [{ name: "account", internalType: "address", type: "address" }],
    name: "balanceOf",
    outputs: [{ name: "", internalType: "uint256", type: "uint256" }],
    stateMutability: "view",
  },
  {
    type: "function",
    inputs: [{ name: "value", internalType: "uint256", type: "uint256" }],
    name: "burn",
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    inputs: [
      { name: "account", internalType: "address", type: "address" },
      { name: "value", internalType: "uint256", type: "uint256" },
    ],
    name: "burnFrom",
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    inputs: [],
    name: "decimals",
    outputs: [{ name: "", internalType: "uint8", type: "uint8" }],
    stateMutability: "view",
  },
  {
    type: "function",
    inputs: [],
    name: "eip712Domain",
    outputs: [
      { name: "fields", internalType: "bytes1", type: "bytes1" },
      { name: "name", internalType: "string", type: "string" },
      { name: "version", internalType: "string", type: "string" },
      { name: "chainId", internalType: "uint256", type: "uint256" },
      { name: "verifyingContract", internalType: "address", type: "address" },
      { name: "salt", internalType: "bytes32", type: "bytes32" },
      { name: "extensions", internalType: "uint256[]", type: "uint256[]" },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    inputs: [
      { name: "to", internalType: "address", type: "address" },
      { name: "amount", internalType: "uint256", type: "uint256" },
    ],
    name: "mint",
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    inputs: [],
    name: "name",
    outputs: [{ name: "", internalType: "string", type: "string" }],
    stateMutability: "view",
  },
  {
    type: "function",
    inputs: [{ name: "owner", internalType: "address", type: "address" }],
    name: "nonces",
    outputs: [{ name: "", internalType: "uint256", type: "uint256" }],
    stateMutability: "view",
  },
  {
    type: "function",
    inputs: [],
    name: "owner",
    outputs: [{ name: "", internalType: "address", type: "address" }],
    stateMutability: "view",
  },
  {
    type: "function",
    inputs: [
      { name: "owner", internalType: "address", type: "address" },
      { name: "spender", internalType: "address", type: "address" },
      { name: "value", internalType: "uint256", type: "uint256" },
      { name: "deadline", internalType: "uint256", type: "uint256" },
      { name: "v", internalType: "uint8", type: "uint8" },
      { name: "r", internalType: "bytes32", type: "bytes32" },
      { name: "s", internalType: "bytes32", type: "bytes32" },
    ],
    name: "permit",
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    inputs: [],
    name: "renounceOwnership",
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    inputs: [],
    name: "symbol",
    outputs: [{ name: "", internalType: "string", type: "string" }],
    stateMutability: "view",
  },
  {
    type: "function",
    inputs: [],
    name: "totalSupply",
    outputs: [{ name: "", internalType: "uint256", type: "uint256" }],
    stateMutability: "view",
  },
  {
    type: "function",
    inputs: [
      { name: "to", internalType: "address", type: "address" },
      { name: "value", internalType: "uint256", type: "uint256" },
    ],
    name: "transfer",
    outputs: [{ name: "", internalType: "bool", type: "bool" }],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    inputs: [
      { name: "from", internalType: "address", type: "address" },
      { name: "to", internalType: "address", type: "address" },
      { name: "value", internalType: "uint256", type: "uint256" },
    ],
    name: "transferFrom",
    outputs: [{ name: "", internalType: "bool", type: "bool" }],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    inputs: [{ name: "newOwner", internalType: "address", type: "address" }],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "event",
    anonymous: false,
    inputs: [
      {
        name: "owner",
        internalType: "address",
        type: "address",
        indexed: true,
      },
      {
        name: "spender",
        internalType: "address",
        type: "address",
        indexed: true,
      },
      {
        name: "value",
        internalType: "uint256",
        type: "uint256",
        indexed: false,
      },
    ],
    name: "Approval",
  },
  { type: "event", anonymous: false, inputs: [], name: "EIP712DomainChanged" },
  {
    type: "event",
    anonymous: false,
    inputs: [
      {
        name: "previousOwner",
        internalType: "address",
        type: "address",
        indexed: true,
      },
      {
        name: "newOwner",
        internalType: "address",
        type: "address",
        indexed: true,
      },
    ],
    name: "OwnershipTransferred",
  },
  {
    type: "event",
    anonymous: false,
    inputs: [
      { name: "from", internalType: "address", type: "address", indexed: true },
      { name: "to", internalType: "address", type: "address", indexed: true },
      {
        name: "value",
        internalType: "uint256",
        type: "uint256",
        indexed: false,
      },
    ],
    name: "Transfer",
  },
  { type: "error", inputs: [], name: "ECDSAInvalidSignature" },
  {
    type: "error",
    inputs: [{ name: "length", internalType: "uint256", type: "uint256" }],
    name: "ECDSAInvalidSignatureLength",
  },
  {
    type: "error",
    inputs: [{ name: "s", internalType: "bytes32", type: "bytes32" }],
    name: "ECDSAInvalidSignatureS",
  },
  {
    type: "error",
    inputs: [
      { name: "spender", internalType: "address", type: "address" },
      { name: "allowance", internalType: "uint256", type: "uint256" },
      { name: "needed", internalType: "uint256", type: "uint256" },
    ],
    name: "ERC20InsufficientAllowance",
  },
  {
    type: "error",
    inputs: [
      { name: "sender", internalType: "address", type: "address" },
      { name: "balance", internalType: "uint256", type: "uint256" },
      { name: "needed", internalType: "uint256", type: "uint256" },
    ],
    name: "ERC20InsufficientBalance",
  },
  {
    type: "error",
    inputs: [{ name: "approver", internalType: "address", type: "address" }],
    name: "ERC20InvalidApprover",
  },
  {
    type: "error",
    inputs: [{ name: "receiver", internalType: "address", type: "address" }],
    name: "ERC20InvalidReceiver",
  },
  {
    type: "error",
    inputs: [{ name: "sender", internalType: "address", type: "address" }],
    name: "ERC20InvalidSender",
  },
  {
    type: "error",
    inputs: [{ name: "spender", internalType: "address", type: "address" }],
    name: "ERC20InvalidSpender",
  },
  {
    type: "error",
    inputs: [{ name: "deadline", internalType: "uint256", type: "uint256" }],
    name: "ERC2612ExpiredSignature",
  },
  {
    type: "error",
    inputs: [
      { name: "signer", internalType: "address", type: "address" },
      { name: "owner", internalType: "address", type: "address" },
    ],
    name: "ERC2612InvalidSigner",
  },
  {
    type: "error",
    inputs: [
      { name: "account", internalType: "address", type: "address" },
      { name: "currentNonce", internalType: "uint256", type: "uint256" },
    ],
    name: "InvalidAccountNonce",
  },
  { type: "error", inputs: [], name: "InvalidShortString" },
  {
    type: "error",
    inputs: [{ name: "owner", internalType: "address", type: "address" }],
    name: "OwnableInvalidOwner",
  },
  {
    type: "error",
    inputs: [{ name: "account", internalType: "address", type: "address" }],
    name: "OwnableUnauthorizedAccount",
  },
  {
    type: "error",
    inputs: [{ name: "str", internalType: "string", type: "string" }],
    name: "StringTooLong",
  },
] as const;

export const itoTokenAddress =
  "0xe7099daf495c9AaD8DbBc609807cCAfCd66c782e" as const;

export const itoTokenConfig = {
  address: itoTokenAddress,
  abi: itoTokenAbi,
} as const;

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// LiquidityFacet
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const liquidityFacetAbi = [
  {
    type: "function",
    inputs: [
      { name: "poolId", internalType: "bytes8", type: "bytes8" },
      { name: "user", internalType: "address", type: "address" },
    ],
    name: "_claimRewards",
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    inputs: [
      { name: "poolId", internalType: "bytes8", type: "bytes8" },
      { name: "tokenIn", internalType: "address", type: "address" },
      { name: "amountIn", internalType: "uint256", type: "uint256" },
      { name: "tokenOut", internalType: "address", type: "address" },
      { name: "amountOut", internalType: "uint256", type: "uint256" },
      { name: "user", internalType: "address", type: "address" },
    ],
    name: "_updatePoolAndTransferAfterSwap",
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    inputs: [
      { name: "poolId", internalType: "bytes8", type: "bytes8" },
      { name: "amountADesired", internalType: "uint256", type: "uint256" },
      { name: "amountBDesired", internalType: "uint256", type: "uint256" },
    ],
    name: "addLiquidity",
    outputs: [
      { name: "amountA", internalType: "uint256", type: "uint256" },
      { name: "amountB", internalType: "uint256", type: "uint256" },
      { name: "liquidity", internalType: "uint256", type: "uint256" },
    ],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    inputs: [
      { name: "tokenA", internalType: "address", type: "address" },
      { name: "tokenB", internalType: "address", type: "address" },
      { name: "baseRewardRate", internalType: "uint256", type: "uint256" },
    ],
    name: "createPool",
    outputs: [{ name: "", internalType: "bytes8", type: "bytes8" }],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    inputs: [
      { name: "poolId", internalType: "bytes8", type: "bytes8" },
      { name: "amount", internalType: "uint256", type: "uint256" },
      { name: "distributionPeriod", internalType: "uint256", type: "uint256" },
    ],
    name: "fundRewards",
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    inputs: [{ name: "poolId", internalType: "bytes8", type: "bytes8" }],
    name: "getPoolConfig",
    outputs: [
      {
        name: "poolConfig",
        internalType: "struct LiquidityStorageLib.PoolConfig",
        type: "tuple",
        components: [
          { name: "tokenA", internalType: "address", type: "address" },
          { name: "tokenB", internalType: "address", type: "address" },
          { name: "baseRewardRate", internalType: "uint256", type: "uint256" },
          { name: "version", internalType: "uint8", type: "uint8" },
        ],
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    inputs: [{ name: "poolId", internalType: "bytes8", type: "bytes8" }],
    name: "getPoolState",
    outputs: [
      {
        name: "poolState",
        internalType: "struct LiquidityStorageLib.PoolState",
        type: "tuple",
        components: [
          { name: "reserveA", internalType: "uint256", type: "uint256" },
          { name: "reserveB", internalType: "uint256", type: "uint256" },
          { name: "totalLPTokens", internalType: "uint256", type: "uint256" },
          { name: "lastUpdate", internalType: "uint256", type: "uint256" },
          {
            name: "accRewardPerShare",
            internalType: "uint256",
            type: "uint256",
          },
        ],
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    inputs: [
      { name: "user", internalType: "address", type: "address" },
      { name: "poolId", internalType: "bytes8", type: "bytes8" },
    ],
    name: "getUserPosition",
    outputs: [
      {
        name: "",
        internalType: "struct LiquidityStorageLib.UserPosition",
        type: "tuple",
        components: [
          { name: "lpTokens", internalType: "uint256", type: "uint256" },
          { name: "rewardDebt", internalType: "uint256", type: "uint256" },
          { name: "lastInteraction", internalType: "uint256", type: "uint256" },
        ],
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    inputs: [
      { name: "poolId", internalType: "bytes8", type: "bytes8" },
      { name: "user", internalType: "address", type: "address" },
    ],
    name: "pendingRewards",
    outputs: [{ name: "", internalType: "uint256", type: "uint256" }],
    stateMutability: "view",
  },
  {
    type: "function",
    inputs: [{ name: "poolId", internalType: "bytes8", type: "bytes8" }],
    name: "poolExists",
    outputs: [],
    stateMutability: "view",
  },
  {
    type: "function",
    inputs: [
      { name: "poolId", internalType: "bytes8", type: "bytes8" },
      { name: "liquidity", internalType: "uint256", type: "uint256" },
    ],
    name: "removeLiquidity",
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "event",
    anonymous: false,
    inputs: [
      {
        name: "provider",
        internalType: "address",
        type: "address",
        indexed: true,
      },
      { name: "poolId", internalType: "bytes8", type: "bytes8", indexed: true },
      {
        name: "amountA",
        internalType: "uint256",
        type: "uint256",
        indexed: false,
      },
      {
        name: "amountB",
        internalType: "uint256",
        type: "uint256",
        indexed: false,
      },
      {
        name: "liquidity",
        internalType: "uint256",
        type: "uint256",
        indexed: false,
      },
    ],
    name: "LiquidityAdded",
  },
  {
    type: "event",
    anonymous: false,
    inputs: [
      {
        name: "provider",
        internalType: "address",
        type: "address",
        indexed: true,
      },
      { name: "poolId", internalType: "bytes8", type: "bytes8", indexed: true },
      {
        name: "amountA",
        internalType: "uint256",
        type: "uint256",
        indexed: false,
      },
      {
        name: "amountB",
        internalType: "uint256",
        type: "uint256",
        indexed: false,
      },
      {
        name: "liquidity",
        internalType: "uint256",
        type: "uint256",
        indexed: false,
      },
    ],
    name: "LiquidityRemoved",
  },
  {
    type: "event",
    anonymous: false,
    inputs: [
      { name: "poolId", internalType: "bytes8", type: "bytes8", indexed: true },
      {
        name: "tokenA",
        internalType: "address",
        type: "address",
        indexed: false,
      },
      {
        name: "tokenB",
        internalType: "address",
        type: "address",
        indexed: false,
      },
    ],
    name: "PoolCreated",
  },
  {
    type: "event",
    anonymous: false,
    inputs: [
      { name: "user", internalType: "address", type: "address", indexed: true },
      { name: "poolId", internalType: "bytes8", type: "bytes8", indexed: true },
      {
        name: "amount",
        internalType: "uint256",
        type: "uint256",
        indexed: false,
      },
    ],
    name: "RewardsClaimed",
  },
  {
    type: "error",
    inputs: [{ name: "token", internalType: "address", type: "address" }],
    name: "DuplicateToken",
  },
  {
    type: "error",
    inputs: [{ name: "token", internalType: "address", type: "address" }],
    name: "InsufficientAmount",
  },
  { type: "error", inputs: [], name: "InsufficientLiquidity" },
  {
    type: "error",
    inputs: [{ name: "token", internalType: "address", type: "address" }],
    name: "InsufficientReserves",
  },
  {
    type: "error",
    inputs: [{ name: "poolId", internalType: "bytes8", type: "bytes8" }],
    name: "PoolAlreadyExists",
  },
  {
    type: "error",
    inputs: [{ name: "poolId", internalType: "bytes8", type: "bytes8" }],
    name: "PoolNotFound",
  },
  { type: "error", inputs: [], name: "ReentrancyGuardReentrantCall" },
  {
    type: "error",
    inputs: [{ name: "token", internalType: "address", type: "address" }],
    name: "SafeERC20FailedOperation",
  },
  { type: "error", inputs: [], name: "ZeroAddress" },
] as const;

export const liquidityFacetAddress =
  "0x6E85056eb08D248Ee516bE85818EE5a4ca0b0223" as const;

export const liquidityFacetConfig = {
  address: liquidityFacetAddress,
  abi: liquidityFacetAbi,
} as const;

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// MockETH
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const mockEthAbi = [
  {
    type: "constructor",
    inputs: [
      { name: "initialOwner", internalType: "address", type: "address" },
    ],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    inputs: [],
    name: "DOMAIN_SEPARATOR",
    outputs: [{ name: "", internalType: "bytes32", type: "bytes32" }],
    stateMutability: "view",
  },
  {
    type: "function",
    inputs: [
      { name: "owner", internalType: "address", type: "address" },
      { name: "spender", internalType: "address", type: "address" },
    ],
    name: "allowance",
    outputs: [{ name: "", internalType: "uint256", type: "uint256" }],
    stateMutability: "view",
  },
  {
    type: "function",
    inputs: [
      { name: "spender", internalType: "address", type: "address" },
      { name: "value", internalType: "uint256", type: "uint256" },
    ],
    name: "approve",
    outputs: [{ name: "", internalType: "bool", type: "bool" }],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    inputs: [{ name: "account", internalType: "address", type: "address" }],
    name: "balanceOf",
    outputs: [{ name: "", internalType: "uint256", type: "uint256" }],
    stateMutability: "view",
  },
  {
    type: "function",
    inputs: [{ name: "value", internalType: "uint256", type: "uint256" }],
    name: "burn",
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    inputs: [
      { name: "account", internalType: "address", type: "address" },
      { name: "value", internalType: "uint256", type: "uint256" },
    ],
    name: "burnFrom",
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    inputs: [],
    name: "decimals",
    outputs: [{ name: "", internalType: "uint8", type: "uint8" }],
    stateMutability: "view",
  },
  {
    type: "function",
    inputs: [],
    name: "eip712Domain",
    outputs: [
      { name: "fields", internalType: "bytes1", type: "bytes1" },
      { name: "name", internalType: "string", type: "string" },
      { name: "version", internalType: "string", type: "string" },
      { name: "chainId", internalType: "uint256", type: "uint256" },
      { name: "verifyingContract", internalType: "address", type: "address" },
      { name: "salt", internalType: "bytes32", type: "bytes32" },
      { name: "extensions", internalType: "uint256[]", type: "uint256[]" },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    inputs: [
      { name: "to", internalType: "address", type: "address" },
      { name: "amount", internalType: "uint256", type: "uint256" },
    ],
    name: "mint",
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    inputs: [],
    name: "name",
    outputs: [{ name: "", internalType: "string", type: "string" }],
    stateMutability: "view",
  },
  {
    type: "function",
    inputs: [{ name: "owner", internalType: "address", type: "address" }],
    name: "nonces",
    outputs: [{ name: "", internalType: "uint256", type: "uint256" }],
    stateMutability: "view",
  },
  {
    type: "function",
    inputs: [],
    name: "owner",
    outputs: [{ name: "", internalType: "address", type: "address" }],
    stateMutability: "view",
  },
  {
    type: "function",
    inputs: [
      { name: "owner", internalType: "address", type: "address" },
      { name: "spender", internalType: "address", type: "address" },
      { name: "value", internalType: "uint256", type: "uint256" },
      { name: "deadline", internalType: "uint256", type: "uint256" },
      { name: "v", internalType: "uint8", type: "uint8" },
      { name: "r", internalType: "bytes32", type: "bytes32" },
      { name: "s", internalType: "bytes32", type: "bytes32" },
    ],
    name: "permit",
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    inputs: [],
    name: "renounceOwnership",
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    inputs: [],
    name: "symbol",
    outputs: [{ name: "", internalType: "string", type: "string" }],
    stateMutability: "view",
  },
  {
    type: "function",
    inputs: [],
    name: "totalSupply",
    outputs: [{ name: "", internalType: "uint256", type: "uint256" }],
    stateMutability: "view",
  },
  {
    type: "function",
    inputs: [
      { name: "to", internalType: "address", type: "address" },
      { name: "value", internalType: "uint256", type: "uint256" },
    ],
    name: "transfer",
    outputs: [{ name: "", internalType: "bool", type: "bool" }],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    inputs: [
      { name: "from", internalType: "address", type: "address" },
      { name: "to", internalType: "address", type: "address" },
      { name: "value", internalType: "uint256", type: "uint256" },
    ],
    name: "transferFrom",
    outputs: [{ name: "", internalType: "bool", type: "bool" }],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    inputs: [{ name: "newOwner", internalType: "address", type: "address" }],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "event",
    anonymous: false,
    inputs: [
      {
        name: "owner",
        internalType: "address",
        type: "address",
        indexed: true,
      },
      {
        name: "spender",
        internalType: "address",
        type: "address",
        indexed: true,
      },
      {
        name: "value",
        internalType: "uint256",
        type: "uint256",
        indexed: false,
      },
    ],
    name: "Approval",
  },
  { type: "event", anonymous: false, inputs: [], name: "EIP712DomainChanged" },
  {
    type: "event",
    anonymous: false,
    inputs: [
      {
        name: "previousOwner",
        internalType: "address",
        type: "address",
        indexed: true,
      },
      {
        name: "newOwner",
        internalType: "address",
        type: "address",
        indexed: true,
      },
    ],
    name: "OwnershipTransferred",
  },
  {
    type: "event",
    anonymous: false,
    inputs: [
      { name: "from", internalType: "address", type: "address", indexed: true },
      { name: "to", internalType: "address", type: "address", indexed: true },
      {
        name: "value",
        internalType: "uint256",
        type: "uint256",
        indexed: false,
      },
    ],
    name: "Transfer",
  },
  { type: "error", inputs: [], name: "ECDSAInvalidSignature" },
  {
    type: "error",
    inputs: [{ name: "length", internalType: "uint256", type: "uint256" }],
    name: "ECDSAInvalidSignatureLength",
  },
  {
    type: "error",
    inputs: [{ name: "s", internalType: "bytes32", type: "bytes32" }],
    name: "ECDSAInvalidSignatureS",
  },
  {
    type: "error",
    inputs: [
      { name: "spender", internalType: "address", type: "address" },
      { name: "allowance", internalType: "uint256", type: "uint256" },
      { name: "needed", internalType: "uint256", type: "uint256" },
    ],
    name: "ERC20InsufficientAllowance",
  },
  {
    type: "error",
    inputs: [
      { name: "sender", internalType: "address", type: "address" },
      { name: "balance", internalType: "uint256", type: "uint256" },
      { name: "needed", internalType: "uint256", type: "uint256" },
    ],
    name: "ERC20InsufficientBalance",
  },
  {
    type: "error",
    inputs: [{ name: "approver", internalType: "address", type: "address" }],
    name: "ERC20InvalidApprover",
  },
  {
    type: "error",
    inputs: [{ name: "receiver", internalType: "address", type: "address" }],
    name: "ERC20InvalidReceiver",
  },
  {
    type: "error",
    inputs: [{ name: "sender", internalType: "address", type: "address" }],
    name: "ERC20InvalidSender",
  },
  {
    type: "error",
    inputs: [{ name: "spender", internalType: "address", type: "address" }],
    name: "ERC20InvalidSpender",
  },
  {
    type: "error",
    inputs: [{ name: "deadline", internalType: "uint256", type: "uint256" }],
    name: "ERC2612ExpiredSignature",
  },
  {
    type: "error",
    inputs: [
      { name: "signer", internalType: "address", type: "address" },
      { name: "owner", internalType: "address", type: "address" },
    ],
    name: "ERC2612InvalidSigner",
  },
  {
    type: "error",
    inputs: [
      { name: "account", internalType: "address", type: "address" },
      { name: "currentNonce", internalType: "uint256", type: "uint256" },
    ],
    name: "InvalidAccountNonce",
  },
  { type: "error", inputs: [], name: "InvalidShortString" },
  {
    type: "error",
    inputs: [{ name: "owner", internalType: "address", type: "address" }],
    name: "OwnableInvalidOwner",
  },
  {
    type: "error",
    inputs: [{ name: "account", internalType: "address", type: "address" }],
    name: "OwnableUnauthorizedAccount",
  },
  {
    type: "error",
    inputs: [{ name: "str", internalType: "string", type: "string" }],
    name: "StringTooLong",
  },
] as const;

export const mockEthAddress =
  "0x2A8F6aC0b8B5f4cCcB1F418A1531F069bB53ae7e" as const;

export const mockEthConfig = {
  address: mockEthAddress,
  abi: mockEthAbi,
} as const;

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// MockUSD
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const mockUsdAbi = [
  {
    type: "constructor",
    inputs: [
      { name: "initialOwner", internalType: "address", type: "address" },
    ],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    inputs: [],
    name: "DOMAIN_SEPARATOR",
    outputs: [{ name: "", internalType: "bytes32", type: "bytes32" }],
    stateMutability: "view",
  },
  {
    type: "function",
    inputs: [
      { name: "owner", internalType: "address", type: "address" },
      { name: "spender", internalType: "address", type: "address" },
    ],
    name: "allowance",
    outputs: [{ name: "", internalType: "uint256", type: "uint256" }],
    stateMutability: "view",
  },
  {
    type: "function",
    inputs: [
      { name: "spender", internalType: "address", type: "address" },
      { name: "value", internalType: "uint256", type: "uint256" },
    ],
    name: "approve",
    outputs: [{ name: "", internalType: "bool", type: "bool" }],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    inputs: [{ name: "account", internalType: "address", type: "address" }],
    name: "balanceOf",
    outputs: [{ name: "", internalType: "uint256", type: "uint256" }],
    stateMutability: "view",
  },
  {
    type: "function",
    inputs: [{ name: "value", internalType: "uint256", type: "uint256" }],
    name: "burn",
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    inputs: [
      { name: "account", internalType: "address", type: "address" },
      { name: "value", internalType: "uint256", type: "uint256" },
    ],
    name: "burnFrom",
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    inputs: [],
    name: "decimals",
    outputs: [{ name: "", internalType: "uint8", type: "uint8" }],
    stateMutability: "view",
  },
  {
    type: "function",
    inputs: [],
    name: "eip712Domain",
    outputs: [
      { name: "fields", internalType: "bytes1", type: "bytes1" },
      { name: "name", internalType: "string", type: "string" },
      { name: "version", internalType: "string", type: "string" },
      { name: "chainId", internalType: "uint256", type: "uint256" },
      { name: "verifyingContract", internalType: "address", type: "address" },
      { name: "salt", internalType: "bytes32", type: "bytes32" },
      { name: "extensions", internalType: "uint256[]", type: "uint256[]" },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    inputs: [
      { name: "to", internalType: "address", type: "address" },
      { name: "amount", internalType: "uint256", type: "uint256" },
    ],
    name: "mint",
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    inputs: [],
    name: "name",
    outputs: [{ name: "", internalType: "string", type: "string" }],
    stateMutability: "view",
  },
  {
    type: "function",
    inputs: [{ name: "owner", internalType: "address", type: "address" }],
    name: "nonces",
    outputs: [{ name: "", internalType: "uint256", type: "uint256" }],
    stateMutability: "view",
  },
  {
    type: "function",
    inputs: [],
    name: "owner",
    outputs: [{ name: "", internalType: "address", type: "address" }],
    stateMutability: "view",
  },
  {
    type: "function",
    inputs: [
      { name: "owner", internalType: "address", type: "address" },
      { name: "spender", internalType: "address", type: "address" },
      { name: "value", internalType: "uint256", type: "uint256" },
      { name: "deadline", internalType: "uint256", type: "uint256" },
      { name: "v", internalType: "uint8", type: "uint8" },
      { name: "r", internalType: "bytes32", type: "bytes32" },
      { name: "s", internalType: "bytes32", type: "bytes32" },
    ],
    name: "permit",
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    inputs: [],
    name: "renounceOwnership",
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    inputs: [],
    name: "symbol",
    outputs: [{ name: "", internalType: "string", type: "string" }],
    stateMutability: "view",
  },
  {
    type: "function",
    inputs: [],
    name: "totalSupply",
    outputs: [{ name: "", internalType: "uint256", type: "uint256" }],
    stateMutability: "view",
  },
  {
    type: "function",
    inputs: [
      { name: "to", internalType: "address", type: "address" },
      { name: "value", internalType: "uint256", type: "uint256" },
    ],
    name: "transfer",
    outputs: [{ name: "", internalType: "bool", type: "bool" }],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    inputs: [
      { name: "from", internalType: "address", type: "address" },
      { name: "to", internalType: "address", type: "address" },
      { name: "value", internalType: "uint256", type: "uint256" },
    ],
    name: "transferFrom",
    outputs: [{ name: "", internalType: "bool", type: "bool" }],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    inputs: [{ name: "newOwner", internalType: "address", type: "address" }],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "event",
    anonymous: false,
    inputs: [
      {
        name: "owner",
        internalType: "address",
        type: "address",
        indexed: true,
      },
      {
        name: "spender",
        internalType: "address",
        type: "address",
        indexed: true,
      },
      {
        name: "value",
        internalType: "uint256",
        type: "uint256",
        indexed: false,
      },
    ],
    name: "Approval",
  },
  { type: "event", anonymous: false, inputs: [], name: "EIP712DomainChanged" },
  {
    type: "event",
    anonymous: false,
    inputs: [
      {
        name: "previousOwner",
        internalType: "address",
        type: "address",
        indexed: true,
      },
      {
        name: "newOwner",
        internalType: "address",
        type: "address",
        indexed: true,
      },
    ],
    name: "OwnershipTransferred",
  },
  {
    type: "event",
    anonymous: false,
    inputs: [
      { name: "from", internalType: "address", type: "address", indexed: true },
      { name: "to", internalType: "address", type: "address", indexed: true },
      {
        name: "value",
        internalType: "uint256",
        type: "uint256",
        indexed: false,
      },
    ],
    name: "Transfer",
  },
  { type: "error", inputs: [], name: "ECDSAInvalidSignature" },
  {
    type: "error",
    inputs: [{ name: "length", internalType: "uint256", type: "uint256" }],
    name: "ECDSAInvalidSignatureLength",
  },
  {
    type: "error",
    inputs: [{ name: "s", internalType: "bytes32", type: "bytes32" }],
    name: "ECDSAInvalidSignatureS",
  },
  {
    type: "error",
    inputs: [
      { name: "spender", internalType: "address", type: "address" },
      { name: "allowance", internalType: "uint256", type: "uint256" },
      { name: "needed", internalType: "uint256", type: "uint256" },
    ],
    name: "ERC20InsufficientAllowance",
  },
  {
    type: "error",
    inputs: [
      { name: "sender", internalType: "address", type: "address" },
      { name: "balance", internalType: "uint256", type: "uint256" },
      { name: "needed", internalType: "uint256", type: "uint256" },
    ],
    name: "ERC20InsufficientBalance",
  },
  {
    type: "error",
    inputs: [{ name: "approver", internalType: "address", type: "address" }],
    name: "ERC20InvalidApprover",
  },
  {
    type: "error",
    inputs: [{ name: "receiver", internalType: "address", type: "address" }],
    name: "ERC20InvalidReceiver",
  },
  {
    type: "error",
    inputs: [{ name: "sender", internalType: "address", type: "address" }],
    name: "ERC20InvalidSender",
  },
  {
    type: "error",
    inputs: [{ name: "spender", internalType: "address", type: "address" }],
    name: "ERC20InvalidSpender",
  },
  {
    type: "error",
    inputs: [{ name: "deadline", internalType: "uint256", type: "uint256" }],
    name: "ERC2612ExpiredSignature",
  },
  {
    type: "error",
    inputs: [
      { name: "signer", internalType: "address", type: "address" },
      { name: "owner", internalType: "address", type: "address" },
    ],
    name: "ERC2612InvalidSigner",
  },
  {
    type: "error",
    inputs: [
      { name: "account", internalType: "address", type: "address" },
      { name: "currentNonce", internalType: "uint256", type: "uint256" },
    ],
    name: "InvalidAccountNonce",
  },
  { type: "error", inputs: [], name: "InvalidShortString" },
  {
    type: "error",
    inputs: [{ name: "owner", internalType: "address", type: "address" }],
    name: "OwnableInvalidOwner",
  },
  {
    type: "error",
    inputs: [{ name: "account", internalType: "address", type: "address" }],
    name: "OwnableUnauthorizedAccount",
  },
  {
    type: "error",
    inputs: [{ name: "str", internalType: "string", type: "string" }],
    name: "StringTooLong",
  },
] as const;

export const mockUsdAddress =
  "0x6e2bBe609E602bE493fF8580523Bf1eeBa2c7693" as const;

export const mockUsdConfig = {
  address: mockUsdAddress,
  abi: mockUsdAbi,
} as const;

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// OracleFacet
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const oracleFacetAbi = [
  {
    type: "function",
    inputs: [
      { name: "poolId", internalType: "bytes8", type: "bytes8" },
      { name: "priceFeed", internalType: "address", type: "address" },
      { name: "volatilityFeed", internalType: "address", type: "address" },
    ],
    name: "addFeed",
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    inputs: [{ name: "poolId", internalType: "bytes8", type: "bytes8" }],
    name: "getLatestPrice",
    outputs: [{ name: "", internalType: "uint256", type: "uint256" }],
    stateMutability: "view",
  },
  {
    type: "function",
    inputs: [{ name: "poolId", internalType: "bytes8", type: "bytes8" }],
    name: "getLatestVolatility",
    outputs: [{ name: "", internalType: "uint256", type: "uint256" }],
    stateMutability: "view",
  },
  { type: "error", inputs: [], name: "PriceFeedNotFound" },
  {
    type: "error",
    inputs: [{ name: "value", internalType: "int256", type: "int256" }],
    name: "SafeCastOverflowedIntToUint",
  },
  { type: "error", inputs: [], name: "VolatilityFeedNotFound" },
] as const;

export const oracleFacetAddress =
  "0x6E85056eb08D248Ee516bE85818EE5a4ca0b0223" as const;

export const oracleFacetConfig = {
  address: oracleFacetAddress,
  abi: oracleFacetAbi,
} as const;

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// SAMMFacet
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const sammFacetAbi = [
  {
    type: "constructor",
    inputs: [
      { name: "vrfCoordinator", internalType: "address", type: "address" },
      { name: "keyHash", internalType: "bytes32", type: "bytes32" },
      { name: "subscriptionId", internalType: "uint256", type: "uint256" },
    ],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    inputs: [],
    name: "acceptOwnership",
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    inputs: [],
    name: "owner",
    outputs: [{ name: "", internalType: "address", type: "address" }],
    stateMutability: "view",
  },
  {
    type: "function",
    inputs: [
      { name: "requestId", internalType: "uint256", type: "uint256" },
      { name: "randomWords", internalType: "uint256[]", type: "uint256[]" },
    ],
    name: "rawFulfillRandomWords",
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    inputs: [],
    name: "s_vrfCoordinator",
    outputs: [
      {
        name: "",
        internalType: "contract IVRFCoordinatorV2Plus",
        type: "address",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    inputs: [
      { name: "_vrfCoordinator", internalType: "address", type: "address" },
    ],
    name: "setCoordinator",
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    inputs: [
      { name: "poolId", internalType: "bytes8", type: "bytes8" },
      { name: "tokenIn", internalType: "address", type: "address" },
      { name: "amountIn", internalType: "uint256", type: "uint256" },
    ],
    name: "swap",
    outputs: [{ name: "", internalType: "uint256", type: "uint256" }],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    inputs: [{ name: "to", internalType: "address", type: "address" }],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "event",
    anonymous: false,
    inputs: [
      {
        name: "vrfCoordinator",
        internalType: "address",
        type: "address",
        indexed: false,
      },
    ],
    name: "CoordinatorSet",
  },
  {
    type: "event",
    anonymous: false,
    inputs: [
      { name: "from", internalType: "address", type: "address", indexed: true },
      { name: "to", internalType: "address", type: "address", indexed: true },
    ],
    name: "OwnershipTransferRequested",
  },
  {
    type: "event",
    anonymous: false,
    inputs: [
      { name: "from", internalType: "address", type: "address", indexed: true },
      { name: "to", internalType: "address", type: "address", indexed: true },
    ],
    name: "OwnershipTransferred",
  },
  {
    type: "event",
    anonymous: false,
    inputs: [
      {
        name: "requestId",
        internalType: "uint256",
        type: "uint256",
        indexed: true,
      },
      {
        name: "amountOut",
        internalType: "uint256",
        type: "uint256",
        indexed: false,
      },
      {
        name: "feeCharged",
        internalType: "uint256",
        type: "uint256",
        indexed: false,
      },
    ],
    name: "SwapCompleted",
  },
  {
    type: "event",
    anonymous: false,
    inputs: [
      {
        name: "requestId",
        internalType: "uint256",
        type: "uint256",
        indexed: true,
      },
      { name: "user", internalType: "address", type: "address", indexed: true },
      {
        name: "tokenIn",
        internalType: "address",
        type: "address",
        indexed: false,
      },
      {
        name: "amountIn",
        internalType: "uint256",
        type: "uint256",
        indexed: false,
      },
    ],
    name: "SwapInitiated",
  },
  {
    type: "error",
    inputs: [
      { name: "have", internalType: "address", type: "address" },
      { name: "want", internalType: "address", type: "address" },
    ],
    name: "OnlyCoordinatorCanFulfill",
  },
  {
    type: "error",
    inputs: [
      { name: "have", internalType: "address", type: "address" },
      { name: "owner", internalType: "address", type: "address" },
      { name: "coordinator", internalType: "address", type: "address" },
    ],
    name: "OnlyOwnerOrCoordinator",
  },
  { type: "error", inputs: [], name: "ReentrancyGuardReentrantCall" },
  {
    type: "error",
    inputs: [{ name: "token", internalType: "address", type: "address" }],
    name: "SafeERC20FailedOperation",
  },
  { type: "error", inputs: [], name: "ZeroAddress" },
] as const;

export const sammFacetAddress =
  "0x6E85056eb08D248Ee516bE85818EE5a4ca0b0223" as const;

export const sammFacetConfig = {
  address: sammFacetAddress,
  abi: sammFacetAbi,
} as const;

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// React
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link itoTokenAbi}__
 */
export const useReadItoToken = /*#__PURE__*/ createUseReadContract({
  abi: itoTokenAbi,
  address: itoTokenAddress,
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link itoTokenAbi}__ and `functionName` set to `"DOMAIN_SEPARATOR"`
 */
export const useReadItoTokenDomainSeparator =
  /*#__PURE__*/ createUseReadContract({
    abi: itoTokenAbi,
    address: itoTokenAddress,
    functionName: "DOMAIN_SEPARATOR",
  });

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link itoTokenAbi}__ and `functionName` set to `"allowance"`
 */
export const useReadItoTokenAllowance = /*#__PURE__*/ createUseReadContract({
  abi: itoTokenAbi,
  address: itoTokenAddress,
  functionName: "allowance",
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link itoTokenAbi}__ and `functionName` set to `"balanceOf"`
 */
export const useReadItoTokenBalanceOf = /*#__PURE__*/ createUseReadContract({
  abi: itoTokenAbi,
  address: itoTokenAddress,
  functionName: "balanceOf",
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link itoTokenAbi}__ and `functionName` set to `"decimals"`
 */
export const useReadItoTokenDecimals = /*#__PURE__*/ createUseReadContract({
  abi: itoTokenAbi,
  address: itoTokenAddress,
  functionName: "decimals",
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link itoTokenAbi}__ and `functionName` set to `"eip712Domain"`
 */
export const useReadItoTokenEip712Domain = /*#__PURE__*/ createUseReadContract({
  abi: itoTokenAbi,
  address: itoTokenAddress,
  functionName: "eip712Domain",
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link itoTokenAbi}__ and `functionName` set to `"name"`
 */
export const useReadItoTokenName = /*#__PURE__*/ createUseReadContract({
  abi: itoTokenAbi,
  address: itoTokenAddress,
  functionName: "name",
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link itoTokenAbi}__ and `functionName` set to `"nonces"`
 */
export const useReadItoTokenNonces = /*#__PURE__*/ createUseReadContract({
  abi: itoTokenAbi,
  address: itoTokenAddress,
  functionName: "nonces",
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link itoTokenAbi}__ and `functionName` set to `"owner"`
 */
export const useReadItoTokenOwner = /*#__PURE__*/ createUseReadContract({
  abi: itoTokenAbi,
  address: itoTokenAddress,
  functionName: "owner",
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link itoTokenAbi}__ and `functionName` set to `"symbol"`
 */
export const useReadItoTokenSymbol = /*#__PURE__*/ createUseReadContract({
  abi: itoTokenAbi,
  address: itoTokenAddress,
  functionName: "symbol",
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link itoTokenAbi}__ and `functionName` set to `"totalSupply"`
 */
export const useReadItoTokenTotalSupply = /*#__PURE__*/ createUseReadContract({
  abi: itoTokenAbi,
  address: itoTokenAddress,
  functionName: "totalSupply",
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link itoTokenAbi}__
 */
export const useWriteItoToken = /*#__PURE__*/ createUseWriteContract({
  abi: itoTokenAbi,
  address: itoTokenAddress,
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link itoTokenAbi}__ and `functionName` set to `"approve"`
 */
export const useWriteItoTokenApprove = /*#__PURE__*/ createUseWriteContract({
  abi: itoTokenAbi,
  address: itoTokenAddress,
  functionName: "approve",
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link itoTokenAbi}__ and `functionName` set to `"burn"`
 */
export const useWriteItoTokenBurn = /*#__PURE__*/ createUseWriteContract({
  abi: itoTokenAbi,
  address: itoTokenAddress,
  functionName: "burn",
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link itoTokenAbi}__ and `functionName` set to `"burnFrom"`
 */
export const useWriteItoTokenBurnFrom = /*#__PURE__*/ createUseWriteContract({
  abi: itoTokenAbi,
  address: itoTokenAddress,
  functionName: "burnFrom",
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link itoTokenAbi}__ and `functionName` set to `"mint"`
 */
export const useWriteItoTokenMint = /*#__PURE__*/ createUseWriteContract({
  abi: itoTokenAbi,
  address: itoTokenAddress,
  functionName: "mint",
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link itoTokenAbi}__ and `functionName` set to `"permit"`
 */
export const useWriteItoTokenPermit = /*#__PURE__*/ createUseWriteContract({
  abi: itoTokenAbi,
  address: itoTokenAddress,
  functionName: "permit",
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link itoTokenAbi}__ and `functionName` set to `"renounceOwnership"`
 */
export const useWriteItoTokenRenounceOwnership =
  /*#__PURE__*/ createUseWriteContract({
    abi: itoTokenAbi,
    address: itoTokenAddress,
    functionName: "renounceOwnership",
  });

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link itoTokenAbi}__ and `functionName` set to `"transfer"`
 */
export const useWriteItoTokenTransfer = /*#__PURE__*/ createUseWriteContract({
  abi: itoTokenAbi,
  address: itoTokenAddress,
  functionName: "transfer",
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link itoTokenAbi}__ and `functionName` set to `"transferFrom"`
 */
export const useWriteItoTokenTransferFrom =
  /*#__PURE__*/ createUseWriteContract({
    abi: itoTokenAbi,
    address: itoTokenAddress,
    functionName: "transferFrom",
  });

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link itoTokenAbi}__ and `functionName` set to `"transferOwnership"`
 */
export const useWriteItoTokenTransferOwnership =
  /*#__PURE__*/ createUseWriteContract({
    abi: itoTokenAbi,
    address: itoTokenAddress,
    functionName: "transferOwnership",
  });

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link itoTokenAbi}__
 */
export const useSimulateItoToken = /*#__PURE__*/ createUseSimulateContract({
  abi: itoTokenAbi,
  address: itoTokenAddress,
});

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link itoTokenAbi}__ and `functionName` set to `"approve"`
 */
export const useSimulateItoTokenApprove =
  /*#__PURE__*/ createUseSimulateContract({
    abi: itoTokenAbi,
    address: itoTokenAddress,
    functionName: "approve",
  });

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link itoTokenAbi}__ and `functionName` set to `"burn"`
 */
export const useSimulateItoTokenBurn = /*#__PURE__*/ createUseSimulateContract({
  abi: itoTokenAbi,
  address: itoTokenAddress,
  functionName: "burn",
});

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link itoTokenAbi}__ and `functionName` set to `"burnFrom"`
 */
export const useSimulateItoTokenBurnFrom =
  /*#__PURE__*/ createUseSimulateContract({
    abi: itoTokenAbi,
    address: itoTokenAddress,
    functionName: "burnFrom",
  });

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link itoTokenAbi}__ and `functionName` set to `"mint"`
 */
export const useSimulateItoTokenMint = /*#__PURE__*/ createUseSimulateContract({
  abi: itoTokenAbi,
  address: itoTokenAddress,
  functionName: "mint",
});

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link itoTokenAbi}__ and `functionName` set to `"permit"`
 */
export const useSimulateItoTokenPermit =
  /*#__PURE__*/ createUseSimulateContract({
    abi: itoTokenAbi,
    address: itoTokenAddress,
    functionName: "permit",
  });

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link itoTokenAbi}__ and `functionName` set to `"renounceOwnership"`
 */
export const useSimulateItoTokenRenounceOwnership =
  /*#__PURE__*/ createUseSimulateContract({
    abi: itoTokenAbi,
    address: itoTokenAddress,
    functionName: "renounceOwnership",
  });

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link itoTokenAbi}__ and `functionName` set to `"transfer"`
 */
export const useSimulateItoTokenTransfer =
  /*#__PURE__*/ createUseSimulateContract({
    abi: itoTokenAbi,
    address: itoTokenAddress,
    functionName: "transfer",
  });

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link itoTokenAbi}__ and `functionName` set to `"transferFrom"`
 */
export const useSimulateItoTokenTransferFrom =
  /*#__PURE__*/ createUseSimulateContract({
    abi: itoTokenAbi,
    address: itoTokenAddress,
    functionName: "transferFrom",
  });

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link itoTokenAbi}__ and `functionName` set to `"transferOwnership"`
 */
export const useSimulateItoTokenTransferOwnership =
  /*#__PURE__*/ createUseSimulateContract({
    abi: itoTokenAbi,
    address: itoTokenAddress,
    functionName: "transferOwnership",
  });

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link itoTokenAbi}__
 */
export const useWatchItoTokenEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: itoTokenAbi,
  address: itoTokenAddress,
});

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link itoTokenAbi}__ and `eventName` set to `"Approval"`
 */
export const useWatchItoTokenApprovalEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: itoTokenAbi,
    address: itoTokenAddress,
    eventName: "Approval",
  });

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link itoTokenAbi}__ and `eventName` set to `"EIP712DomainChanged"`
 */
export const useWatchItoTokenEip712DomainChangedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: itoTokenAbi,
    address: itoTokenAddress,
    eventName: "EIP712DomainChanged",
  });

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link itoTokenAbi}__ and `eventName` set to `"OwnershipTransferred"`
 */
export const useWatchItoTokenOwnershipTransferredEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: itoTokenAbi,
    address: itoTokenAddress,
    eventName: "OwnershipTransferred",
  });

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link itoTokenAbi}__ and `eventName` set to `"Transfer"`
 */
export const useWatchItoTokenTransferEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: itoTokenAbi,
    address: itoTokenAddress,
    eventName: "Transfer",
  });

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link liquidityFacetAbi}__
 */
export const useReadLiquidityFacet = /*#__PURE__*/ createUseReadContract({
  abi: liquidityFacetAbi,
  address: liquidityFacetAddress,
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link liquidityFacetAbi}__ and `functionName` set to `"getPoolConfig"`
 */
export const useReadLiquidityFacetGetPoolConfig =
  /*#__PURE__*/ createUseReadContract({
    abi: liquidityFacetAbi,
    address: liquidityFacetAddress,
    functionName: "getPoolConfig",
  });

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link liquidityFacetAbi}__ and `functionName` set to `"getPoolState"`
 */
export const useReadLiquidityFacetGetPoolState =
  /*#__PURE__*/ createUseReadContract({
    abi: liquidityFacetAbi,
    address: liquidityFacetAddress,
    functionName: "getPoolState",
  });

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link liquidityFacetAbi}__ and `functionName` set to `"getUserPosition"`
 */
export const useReadLiquidityFacetGetUserPosition =
  /*#__PURE__*/ createUseReadContract({
    abi: liquidityFacetAbi,
    address: liquidityFacetAddress,
    functionName: "getUserPosition",
  });

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link liquidityFacetAbi}__ and `functionName` set to `"pendingRewards"`
 */
export const useReadLiquidityFacetPendingRewards =
  /*#__PURE__*/ createUseReadContract({
    abi: liquidityFacetAbi,
    address: liquidityFacetAddress,
    functionName: "pendingRewards",
  });

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link liquidityFacetAbi}__ and `functionName` set to `"poolExists"`
 */
export const useReadLiquidityFacetPoolExists =
  /*#__PURE__*/ createUseReadContract({
    abi: liquidityFacetAbi,
    address: liquidityFacetAddress,
    functionName: "poolExists",
  });

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link liquidityFacetAbi}__
 */
export const useWriteLiquidityFacet = /*#__PURE__*/ createUseWriteContract({
  abi: liquidityFacetAbi,
  address: liquidityFacetAddress,
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link liquidityFacetAbi}__ and `functionName` set to `"_claimRewards"`
 */
export const useWriteLiquidityFacetClaimRewards =
  /*#__PURE__*/ createUseWriteContract({
    abi: liquidityFacetAbi,
    address: liquidityFacetAddress,
    functionName: "_claimRewards",
  });

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link liquidityFacetAbi}__ and `functionName` set to `"_updatePoolAndTransferAfterSwap"`
 */
export const useWriteLiquidityFacetUpdatePoolAndTransferAfterSwap =
  /*#__PURE__*/ createUseWriteContract({
    abi: liquidityFacetAbi,
    address: liquidityFacetAddress,
    functionName: "_updatePoolAndTransferAfterSwap",
  });

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link liquidityFacetAbi}__ and `functionName` set to `"addLiquidity"`
 */
export const useWriteLiquidityFacetAddLiquidity =
  /*#__PURE__*/ createUseWriteContract({
    abi: liquidityFacetAbi,
    address: liquidityFacetAddress,
    functionName: "addLiquidity",
  });

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link liquidityFacetAbi}__ and `functionName` set to `"createPool"`
 */
export const useWriteLiquidityFacetCreatePool =
  /*#__PURE__*/ createUseWriteContract({
    abi: liquidityFacetAbi,
    address: liquidityFacetAddress,
    functionName: "createPool",
  });

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link liquidityFacetAbi}__ and `functionName` set to `"fundRewards"`
 */
export const useWriteLiquidityFacetFundRewards =
  /*#__PURE__*/ createUseWriteContract({
    abi: liquidityFacetAbi,
    address: liquidityFacetAddress,
    functionName: "fundRewards",
  });

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link liquidityFacetAbi}__ and `functionName` set to `"removeLiquidity"`
 */
export const useWriteLiquidityFacetRemoveLiquidity =
  /*#__PURE__*/ createUseWriteContract({
    abi: liquidityFacetAbi,
    address: liquidityFacetAddress,
    functionName: "removeLiquidity",
  });

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link liquidityFacetAbi}__
 */
export const useSimulateLiquidityFacet =
  /*#__PURE__*/ createUseSimulateContract({
    abi: liquidityFacetAbi,
    address: liquidityFacetAddress,
  });

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link liquidityFacetAbi}__ and `functionName` set to `"_claimRewards"`
 */
export const useSimulateLiquidityFacetClaimRewards =
  /*#__PURE__*/ createUseSimulateContract({
    abi: liquidityFacetAbi,
    address: liquidityFacetAddress,
    functionName: "_claimRewards",
  });

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link liquidityFacetAbi}__ and `functionName` set to `"_updatePoolAndTransferAfterSwap"`
 */
export const useSimulateLiquidityFacetUpdatePoolAndTransferAfterSwap =
  /*#__PURE__*/ createUseSimulateContract({
    abi: liquidityFacetAbi,
    address: liquidityFacetAddress,
    functionName: "_updatePoolAndTransferAfterSwap",
  });

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link liquidityFacetAbi}__ and `functionName` set to `"addLiquidity"`
 */
export const useSimulateLiquidityFacetAddLiquidity =
  /*#__PURE__*/ createUseSimulateContract({
    abi: liquidityFacetAbi,
    address: liquidityFacetAddress,
    functionName: "addLiquidity",
  });

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link liquidityFacetAbi}__ and `functionName` set to `"createPool"`
 */
export const useSimulateLiquidityFacetCreatePool =
  /*#__PURE__*/ createUseSimulateContract({
    abi: liquidityFacetAbi,
    address: liquidityFacetAddress,
    functionName: "createPool",
  });

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link liquidityFacetAbi}__ and `functionName` set to `"fundRewards"`
 */
export const useSimulateLiquidityFacetFundRewards =
  /*#__PURE__*/ createUseSimulateContract({
    abi: liquidityFacetAbi,
    address: liquidityFacetAddress,
    functionName: "fundRewards",
  });

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link liquidityFacetAbi}__ and `functionName` set to `"removeLiquidity"`
 */
export const useSimulateLiquidityFacetRemoveLiquidity =
  /*#__PURE__*/ createUseSimulateContract({
    abi: liquidityFacetAbi,
    address: liquidityFacetAddress,
    functionName: "removeLiquidity",
  });

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link liquidityFacetAbi}__
 */
export const useWatchLiquidityFacetEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: liquidityFacetAbi,
    address: liquidityFacetAddress,
  });

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link liquidityFacetAbi}__ and `eventName` set to `"LiquidityAdded"`
 */
export const useWatchLiquidityFacetLiquidityAddedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: liquidityFacetAbi,
    address: liquidityFacetAddress,
    eventName: "LiquidityAdded",
  });

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link liquidityFacetAbi}__ and `eventName` set to `"LiquidityRemoved"`
 */
export const useWatchLiquidityFacetLiquidityRemovedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: liquidityFacetAbi,
    address: liquidityFacetAddress,
    eventName: "LiquidityRemoved",
  });

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link liquidityFacetAbi}__ and `eventName` set to `"PoolCreated"`
 */
export const useWatchLiquidityFacetPoolCreatedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: liquidityFacetAbi,
    address: liquidityFacetAddress,
    eventName: "PoolCreated",
  });

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link liquidityFacetAbi}__ and `eventName` set to `"RewardsClaimed"`
 */
export const useWatchLiquidityFacetRewardsClaimedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: liquidityFacetAbi,
    address: liquidityFacetAddress,
    eventName: "RewardsClaimed",
  });

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link mockEthAbi}__
 */
export const useReadMockEth = /*#__PURE__*/ createUseReadContract({
  abi: mockEthAbi,
  address: mockEthAddress,
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link mockEthAbi}__ and `functionName` set to `"DOMAIN_SEPARATOR"`
 */
export const useReadMockEthDomainSeparator =
  /*#__PURE__*/ createUseReadContract({
    abi: mockEthAbi,
    address: mockEthAddress,
    functionName: "DOMAIN_SEPARATOR",
  });

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link mockEthAbi}__ and `functionName` set to `"allowance"`
 */
export const useReadMockEthAllowance = /*#__PURE__*/ createUseReadContract({
  abi: mockEthAbi,
  address: mockEthAddress,
  functionName: "allowance",
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link mockEthAbi}__ and `functionName` set to `"balanceOf"`
 */
export const useReadMockEthBalanceOf = /*#__PURE__*/ createUseReadContract({
  abi: mockEthAbi,
  address: mockEthAddress,
  functionName: "balanceOf",
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link mockEthAbi}__ and `functionName` set to `"decimals"`
 */
export const useReadMockEthDecimals = /*#__PURE__*/ createUseReadContract({
  abi: mockEthAbi,
  address: mockEthAddress,
  functionName: "decimals",
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link mockEthAbi}__ and `functionName` set to `"eip712Domain"`
 */
export const useReadMockEthEip712Domain = /*#__PURE__*/ createUseReadContract({
  abi: mockEthAbi,
  address: mockEthAddress,
  functionName: "eip712Domain",
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link mockEthAbi}__ and `functionName` set to `"name"`
 */
export const useReadMockEthName = /*#__PURE__*/ createUseReadContract({
  abi: mockEthAbi,
  address: mockEthAddress,
  functionName: "name",
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link mockEthAbi}__ and `functionName` set to `"nonces"`
 */
export const useReadMockEthNonces = /*#__PURE__*/ createUseReadContract({
  abi: mockEthAbi,
  address: mockEthAddress,
  functionName: "nonces",
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link mockEthAbi}__ and `functionName` set to `"owner"`
 */
export const useReadMockEthOwner = /*#__PURE__*/ createUseReadContract({
  abi: mockEthAbi,
  address: mockEthAddress,
  functionName: "owner",
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link mockEthAbi}__ and `functionName` set to `"symbol"`
 */
export const useReadMockEthSymbol = /*#__PURE__*/ createUseReadContract({
  abi: mockEthAbi,
  address: mockEthAddress,
  functionName: "symbol",
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link mockEthAbi}__ and `functionName` set to `"totalSupply"`
 */
export const useReadMockEthTotalSupply = /*#__PURE__*/ createUseReadContract({
  abi: mockEthAbi,
  address: mockEthAddress,
  functionName: "totalSupply",
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link mockEthAbi}__
 */
export const useWriteMockEth = /*#__PURE__*/ createUseWriteContract({
  abi: mockEthAbi,
  address: mockEthAddress,
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link mockEthAbi}__ and `functionName` set to `"approve"`
 */
export const useWriteMockEthApprove = /*#__PURE__*/ createUseWriteContract({
  abi: mockEthAbi,
  address: mockEthAddress,
  functionName: "approve",
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link mockEthAbi}__ and `functionName` set to `"burn"`
 */
export const useWriteMockEthBurn = /*#__PURE__*/ createUseWriteContract({
  abi: mockEthAbi,
  address: mockEthAddress,
  functionName: "burn",
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link mockEthAbi}__ and `functionName` set to `"burnFrom"`
 */
export const useWriteMockEthBurnFrom = /*#__PURE__*/ createUseWriteContract({
  abi: mockEthAbi,
  address: mockEthAddress,
  functionName: "burnFrom",
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link mockEthAbi}__ and `functionName` set to `"mint"`
 */
export const useWriteMockEthMint = /*#__PURE__*/ createUseWriteContract({
  abi: mockEthAbi,
  address: mockEthAddress,
  functionName: "mint",
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link mockEthAbi}__ and `functionName` set to `"permit"`
 */
export const useWriteMockEthPermit = /*#__PURE__*/ createUseWriteContract({
  abi: mockEthAbi,
  address: mockEthAddress,
  functionName: "permit",
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link mockEthAbi}__ and `functionName` set to `"renounceOwnership"`
 */
export const useWriteMockEthRenounceOwnership =
  /*#__PURE__*/ createUseWriteContract({
    abi: mockEthAbi,
    address: mockEthAddress,
    functionName: "renounceOwnership",
  });

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link mockEthAbi}__ and `functionName` set to `"transfer"`
 */
export const useWriteMockEthTransfer = /*#__PURE__*/ createUseWriteContract({
  abi: mockEthAbi,
  address: mockEthAddress,
  functionName: "transfer",
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link mockEthAbi}__ and `functionName` set to `"transferFrom"`
 */
export const useWriteMockEthTransferFrom = /*#__PURE__*/ createUseWriteContract(
  { abi: mockEthAbi, address: mockEthAddress, functionName: "transferFrom" },
);

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link mockEthAbi}__ and `functionName` set to `"transferOwnership"`
 */
export const useWriteMockEthTransferOwnership =
  /*#__PURE__*/ createUseWriteContract({
    abi: mockEthAbi,
    address: mockEthAddress,
    functionName: "transferOwnership",
  });

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link mockEthAbi}__
 */
export const useSimulateMockEth = /*#__PURE__*/ createUseSimulateContract({
  abi: mockEthAbi,
  address: mockEthAddress,
});

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link mockEthAbi}__ and `functionName` set to `"approve"`
 */
export const useSimulateMockEthApprove =
  /*#__PURE__*/ createUseSimulateContract({
    abi: mockEthAbi,
    address: mockEthAddress,
    functionName: "approve",
  });

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link mockEthAbi}__ and `functionName` set to `"burn"`
 */
export const useSimulateMockEthBurn = /*#__PURE__*/ createUseSimulateContract({
  abi: mockEthAbi,
  address: mockEthAddress,
  functionName: "burn",
});

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link mockEthAbi}__ and `functionName` set to `"burnFrom"`
 */
export const useSimulateMockEthBurnFrom =
  /*#__PURE__*/ createUseSimulateContract({
    abi: mockEthAbi,
    address: mockEthAddress,
    functionName: "burnFrom",
  });

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link mockEthAbi}__ and `functionName` set to `"mint"`
 */
export const useSimulateMockEthMint = /*#__PURE__*/ createUseSimulateContract({
  abi: mockEthAbi,
  address: mockEthAddress,
  functionName: "mint",
});

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link mockEthAbi}__ and `functionName` set to `"permit"`
 */
export const useSimulateMockEthPermit = /*#__PURE__*/ createUseSimulateContract(
  { abi: mockEthAbi, address: mockEthAddress, functionName: "permit" },
);

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link mockEthAbi}__ and `functionName` set to `"renounceOwnership"`
 */
export const useSimulateMockEthRenounceOwnership =
  /*#__PURE__*/ createUseSimulateContract({
    abi: mockEthAbi,
    address: mockEthAddress,
    functionName: "renounceOwnership",
  });

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link mockEthAbi}__ and `functionName` set to `"transfer"`
 */
export const useSimulateMockEthTransfer =
  /*#__PURE__*/ createUseSimulateContract({
    abi: mockEthAbi,
    address: mockEthAddress,
    functionName: "transfer",
  });

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link mockEthAbi}__ and `functionName` set to `"transferFrom"`
 */
export const useSimulateMockEthTransferFrom =
  /*#__PURE__*/ createUseSimulateContract({
    abi: mockEthAbi,
    address: mockEthAddress,
    functionName: "transferFrom",
  });

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link mockEthAbi}__ and `functionName` set to `"transferOwnership"`
 */
export const useSimulateMockEthTransferOwnership =
  /*#__PURE__*/ createUseSimulateContract({
    abi: mockEthAbi,
    address: mockEthAddress,
    functionName: "transferOwnership",
  });

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link mockEthAbi}__
 */
export const useWatchMockEthEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: mockEthAbi,
  address: mockEthAddress,
});

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link mockEthAbi}__ and `eventName` set to `"Approval"`
 */
export const useWatchMockEthApprovalEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: mockEthAbi,
    address: mockEthAddress,
    eventName: "Approval",
  });

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link mockEthAbi}__ and `eventName` set to `"EIP712DomainChanged"`
 */
export const useWatchMockEthEip712DomainChangedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: mockEthAbi,
    address: mockEthAddress,
    eventName: "EIP712DomainChanged",
  });

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link mockEthAbi}__ and `eventName` set to `"OwnershipTransferred"`
 */
export const useWatchMockEthOwnershipTransferredEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: mockEthAbi,
    address: mockEthAddress,
    eventName: "OwnershipTransferred",
  });

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link mockEthAbi}__ and `eventName` set to `"Transfer"`
 */
export const useWatchMockEthTransferEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: mockEthAbi,
    address: mockEthAddress,
    eventName: "Transfer",
  });

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link mockUsdAbi}__
 */
export const useReadMockUsd = /*#__PURE__*/ createUseReadContract({
  abi: mockUsdAbi,
  address: mockUsdAddress,
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link mockUsdAbi}__ and `functionName` set to `"DOMAIN_SEPARATOR"`
 */
export const useReadMockUsdDomainSeparator =
  /*#__PURE__*/ createUseReadContract({
    abi: mockUsdAbi,
    address: mockUsdAddress,
    functionName: "DOMAIN_SEPARATOR",
  });

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link mockUsdAbi}__ and `functionName` set to `"allowance"`
 */
export const useReadMockUsdAllowance = /*#__PURE__*/ createUseReadContract({
  abi: mockUsdAbi,
  address: mockUsdAddress,
  functionName: "allowance",
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link mockUsdAbi}__ and `functionName` set to `"balanceOf"`
 */
export const useReadMockUsdBalanceOf = /*#__PURE__*/ createUseReadContract({
  abi: mockUsdAbi,
  address: mockUsdAddress,
  functionName: "balanceOf",
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link mockUsdAbi}__ and `functionName` set to `"decimals"`
 */
export const useReadMockUsdDecimals = /*#__PURE__*/ createUseReadContract({
  abi: mockUsdAbi,
  address: mockUsdAddress,
  functionName: "decimals",
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link mockUsdAbi}__ and `functionName` set to `"eip712Domain"`
 */
export const useReadMockUsdEip712Domain = /*#__PURE__*/ createUseReadContract({
  abi: mockUsdAbi,
  address: mockUsdAddress,
  functionName: "eip712Domain",
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link mockUsdAbi}__ and `functionName` set to `"name"`
 */
export const useReadMockUsdName = /*#__PURE__*/ createUseReadContract({
  abi: mockUsdAbi,
  address: mockUsdAddress,
  functionName: "name",
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link mockUsdAbi}__ and `functionName` set to `"nonces"`
 */
export const useReadMockUsdNonces = /*#__PURE__*/ createUseReadContract({
  abi: mockUsdAbi,
  address: mockUsdAddress,
  functionName: "nonces",
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link mockUsdAbi}__ and `functionName` set to `"owner"`
 */
export const useReadMockUsdOwner = /*#__PURE__*/ createUseReadContract({
  abi: mockUsdAbi,
  address: mockUsdAddress,
  functionName: "owner",
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link mockUsdAbi}__ and `functionName` set to `"symbol"`
 */
export const useReadMockUsdSymbol = /*#__PURE__*/ createUseReadContract({
  abi: mockUsdAbi,
  address: mockUsdAddress,
  functionName: "symbol",
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link mockUsdAbi}__ and `functionName` set to `"totalSupply"`
 */
export const useReadMockUsdTotalSupply = /*#__PURE__*/ createUseReadContract({
  abi: mockUsdAbi,
  address: mockUsdAddress,
  functionName: "totalSupply",
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link mockUsdAbi}__
 */
export const useWriteMockUsd = /*#__PURE__*/ createUseWriteContract({
  abi: mockUsdAbi,
  address: mockUsdAddress,
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link mockUsdAbi}__ and `functionName` set to `"approve"`
 */
export const useWriteMockUsdApprove = /*#__PURE__*/ createUseWriteContract({
  abi: mockUsdAbi,
  address: mockUsdAddress,
  functionName: "approve",
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link mockUsdAbi}__ and `functionName` set to `"burn"`
 */
export const useWriteMockUsdBurn = /*#__PURE__*/ createUseWriteContract({
  abi: mockUsdAbi,
  address: mockUsdAddress,
  functionName: "burn",
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link mockUsdAbi}__ and `functionName` set to `"burnFrom"`
 */
export const useWriteMockUsdBurnFrom = /*#__PURE__*/ createUseWriteContract({
  abi: mockUsdAbi,
  address: mockUsdAddress,
  functionName: "burnFrom",
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link mockUsdAbi}__ and `functionName` set to `"mint"`
 */
export const useWriteMockUsdMint = /*#__PURE__*/ createUseWriteContract({
  abi: mockUsdAbi,
  address: mockUsdAddress,
  functionName: "mint",
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link mockUsdAbi}__ and `functionName` set to `"permit"`
 */
export const useWriteMockUsdPermit = /*#__PURE__*/ createUseWriteContract({
  abi: mockUsdAbi,
  address: mockUsdAddress,
  functionName: "permit",
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link mockUsdAbi}__ and `functionName` set to `"renounceOwnership"`
 */
export const useWriteMockUsdRenounceOwnership =
  /*#__PURE__*/ createUseWriteContract({
    abi: mockUsdAbi,
    address: mockUsdAddress,
    functionName: "renounceOwnership",
  });

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link mockUsdAbi}__ and `functionName` set to `"transfer"`
 */
export const useWriteMockUsdTransfer = /*#__PURE__*/ createUseWriteContract({
  abi: mockUsdAbi,
  address: mockUsdAddress,
  functionName: "transfer",
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link mockUsdAbi}__ and `functionName` set to `"transferFrom"`
 */
export const useWriteMockUsdTransferFrom = /*#__PURE__*/ createUseWriteContract(
  { abi: mockUsdAbi, address: mockUsdAddress, functionName: "transferFrom" },
);

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link mockUsdAbi}__ and `functionName` set to `"transferOwnership"`
 */
export const useWriteMockUsdTransferOwnership =
  /*#__PURE__*/ createUseWriteContract({
    abi: mockUsdAbi,
    address: mockUsdAddress,
    functionName: "transferOwnership",
  });

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link mockUsdAbi}__
 */
export const useSimulateMockUsd = /*#__PURE__*/ createUseSimulateContract({
  abi: mockUsdAbi,
  address: mockUsdAddress,
});

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link mockUsdAbi}__ and `functionName` set to `"approve"`
 */
export const useSimulateMockUsdApprove =
  /*#__PURE__*/ createUseSimulateContract({
    abi: mockUsdAbi,
    address: mockUsdAddress,
    functionName: "approve",
  });

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link mockUsdAbi}__ and `functionName` set to `"burn"`
 */
export const useSimulateMockUsdBurn = /*#__PURE__*/ createUseSimulateContract({
  abi: mockUsdAbi,
  address: mockUsdAddress,
  functionName: "burn",
});

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link mockUsdAbi}__ and `functionName` set to `"burnFrom"`
 */
export const useSimulateMockUsdBurnFrom =
  /*#__PURE__*/ createUseSimulateContract({
    abi: mockUsdAbi,
    address: mockUsdAddress,
    functionName: "burnFrom",
  });

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link mockUsdAbi}__ and `functionName` set to `"mint"`
 */
export const useSimulateMockUsdMint = /*#__PURE__*/ createUseSimulateContract({
  abi: mockUsdAbi,
  address: mockUsdAddress,
  functionName: "mint",
});

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link mockUsdAbi}__ and `functionName` set to `"permit"`
 */
export const useSimulateMockUsdPermit = /*#__PURE__*/ createUseSimulateContract(
  { abi: mockUsdAbi, address: mockUsdAddress, functionName: "permit" },
);

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link mockUsdAbi}__ and `functionName` set to `"renounceOwnership"`
 */
export const useSimulateMockUsdRenounceOwnership =
  /*#__PURE__*/ createUseSimulateContract({
    abi: mockUsdAbi,
    address: mockUsdAddress,
    functionName: "renounceOwnership",
  });

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link mockUsdAbi}__ and `functionName` set to `"transfer"`
 */
export const useSimulateMockUsdTransfer =
  /*#__PURE__*/ createUseSimulateContract({
    abi: mockUsdAbi,
    address: mockUsdAddress,
    functionName: "transfer",
  });

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link mockUsdAbi}__ and `functionName` set to `"transferFrom"`
 */
export const useSimulateMockUsdTransferFrom =
  /*#__PURE__*/ createUseSimulateContract({
    abi: mockUsdAbi,
    address: mockUsdAddress,
    functionName: "transferFrom",
  });

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link mockUsdAbi}__ and `functionName` set to `"transferOwnership"`
 */
export const useSimulateMockUsdTransferOwnership =
  /*#__PURE__*/ createUseSimulateContract({
    abi: mockUsdAbi,
    address: mockUsdAddress,
    functionName: "transferOwnership",
  });

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link mockUsdAbi}__
 */
export const useWatchMockUsdEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: mockUsdAbi,
  address: mockUsdAddress,
});

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link mockUsdAbi}__ and `eventName` set to `"Approval"`
 */
export const useWatchMockUsdApprovalEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: mockUsdAbi,
    address: mockUsdAddress,
    eventName: "Approval",
  });

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link mockUsdAbi}__ and `eventName` set to `"EIP712DomainChanged"`
 */
export const useWatchMockUsdEip712DomainChangedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: mockUsdAbi,
    address: mockUsdAddress,
    eventName: "EIP712DomainChanged",
  });

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link mockUsdAbi}__ and `eventName` set to `"OwnershipTransferred"`
 */
export const useWatchMockUsdOwnershipTransferredEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: mockUsdAbi,
    address: mockUsdAddress,
    eventName: "OwnershipTransferred",
  });

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link mockUsdAbi}__ and `eventName` set to `"Transfer"`
 */
export const useWatchMockUsdTransferEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: mockUsdAbi,
    address: mockUsdAddress,
    eventName: "Transfer",
  });

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link oracleFacetAbi}__
 */
export const useReadOracleFacet = /*#__PURE__*/ createUseReadContract({
  abi: oracleFacetAbi,
  address: oracleFacetAddress,
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link oracleFacetAbi}__ and `functionName` set to `"getLatestPrice"`
 */
export const useReadOracleFacetGetLatestPrice =
  /*#__PURE__*/ createUseReadContract({
    abi: oracleFacetAbi,
    address: oracleFacetAddress,
    functionName: "getLatestPrice",
  });

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link oracleFacetAbi}__ and `functionName` set to `"getLatestVolatility"`
 */
export const useReadOracleFacetGetLatestVolatility =
  /*#__PURE__*/ createUseReadContract({
    abi: oracleFacetAbi,
    address: oracleFacetAddress,
    functionName: "getLatestVolatility",
  });

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link oracleFacetAbi}__
 */
export const useWriteOracleFacet = /*#__PURE__*/ createUseWriteContract({
  abi: oracleFacetAbi,
  address: oracleFacetAddress,
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link oracleFacetAbi}__ and `functionName` set to `"addFeed"`
 */
export const useWriteOracleFacetAddFeed = /*#__PURE__*/ createUseWriteContract({
  abi: oracleFacetAbi,
  address: oracleFacetAddress,
  functionName: "addFeed",
});

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link oracleFacetAbi}__
 */
export const useSimulateOracleFacet = /*#__PURE__*/ createUseSimulateContract({
  abi: oracleFacetAbi,
  address: oracleFacetAddress,
});

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link oracleFacetAbi}__ and `functionName` set to `"addFeed"`
 */
export const useSimulateOracleFacetAddFeed =
  /*#__PURE__*/ createUseSimulateContract({
    abi: oracleFacetAbi,
    address: oracleFacetAddress,
    functionName: "addFeed",
  });

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link sammFacetAbi}__
 */
export const useReadSammFacet = /*#__PURE__*/ createUseReadContract({
  abi: sammFacetAbi,
  address: sammFacetAddress,
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link sammFacetAbi}__ and `functionName` set to `"owner"`
 */
export const useReadSammFacetOwner = /*#__PURE__*/ createUseReadContract({
  abi: sammFacetAbi,
  address: sammFacetAddress,
  functionName: "owner",
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link sammFacetAbi}__ and `functionName` set to `"s_vrfCoordinator"`
 */
export const useReadSammFacetSVrfCoordinator =
  /*#__PURE__*/ createUseReadContract({
    abi: sammFacetAbi,
    address: sammFacetAddress,
    functionName: "s_vrfCoordinator",
  });

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link sammFacetAbi}__
 */
export const useWriteSammFacet = /*#__PURE__*/ createUseWriteContract({
  abi: sammFacetAbi,
  address: sammFacetAddress,
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link sammFacetAbi}__ and `functionName` set to `"acceptOwnership"`
 */
export const useWriteSammFacetAcceptOwnership =
  /*#__PURE__*/ createUseWriteContract({
    abi: sammFacetAbi,
    address: sammFacetAddress,
    functionName: "acceptOwnership",
  });

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link sammFacetAbi}__ and `functionName` set to `"rawFulfillRandomWords"`
 */
export const useWriteSammFacetRawFulfillRandomWords =
  /*#__PURE__*/ createUseWriteContract({
    abi: sammFacetAbi,
    address: sammFacetAddress,
    functionName: "rawFulfillRandomWords",
  });

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link sammFacetAbi}__ and `functionName` set to `"setCoordinator"`
 */
export const useWriteSammFacetSetCoordinator =
  /*#__PURE__*/ createUseWriteContract({
    abi: sammFacetAbi,
    address: sammFacetAddress,
    functionName: "setCoordinator",
  });

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link sammFacetAbi}__ and `functionName` set to `"swap"`
 */
export const useWriteSammFacetSwap = /*#__PURE__*/ createUseWriteContract({
  abi: sammFacetAbi,
  address: sammFacetAddress,
  functionName: "swap",
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link sammFacetAbi}__ and `functionName` set to `"transferOwnership"`
 */
export const useWriteSammFacetTransferOwnership =
  /*#__PURE__*/ createUseWriteContract({
    abi: sammFacetAbi,
    address: sammFacetAddress,
    functionName: "transferOwnership",
  });

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link sammFacetAbi}__
 */
export const useSimulateSammFacet = /*#__PURE__*/ createUseSimulateContract({
  abi: sammFacetAbi,
  address: sammFacetAddress,
});

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link sammFacetAbi}__ and `functionName` set to `"acceptOwnership"`
 */
export const useSimulateSammFacetAcceptOwnership =
  /*#__PURE__*/ createUseSimulateContract({
    abi: sammFacetAbi,
    address: sammFacetAddress,
    functionName: "acceptOwnership",
  });

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link sammFacetAbi}__ and `functionName` set to `"rawFulfillRandomWords"`
 */
export const useSimulateSammFacetRawFulfillRandomWords =
  /*#__PURE__*/ createUseSimulateContract({
    abi: sammFacetAbi,
    address: sammFacetAddress,
    functionName: "rawFulfillRandomWords",
  });

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link sammFacetAbi}__ and `functionName` set to `"setCoordinator"`
 */
export const useSimulateSammFacetSetCoordinator =
  /*#__PURE__*/ createUseSimulateContract({
    abi: sammFacetAbi,
    address: sammFacetAddress,
    functionName: "setCoordinator",
  });

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link sammFacetAbi}__ and `functionName` set to `"swap"`
 */
export const useSimulateSammFacetSwap = /*#__PURE__*/ createUseSimulateContract(
  { abi: sammFacetAbi, address: sammFacetAddress, functionName: "swap" },
);

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link sammFacetAbi}__ and `functionName` set to `"transferOwnership"`
 */
export const useSimulateSammFacetTransferOwnership =
  /*#__PURE__*/ createUseSimulateContract({
    abi: sammFacetAbi,
    address: sammFacetAddress,
    functionName: "transferOwnership",
  });

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link sammFacetAbi}__
 */
export const useWatchSammFacetEvent = /*#__PURE__*/ createUseWatchContractEvent(
  { abi: sammFacetAbi, address: sammFacetAddress },
);

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link sammFacetAbi}__ and `eventName` set to `"CoordinatorSet"`
 */
export const useWatchSammFacetCoordinatorSetEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: sammFacetAbi,
    address: sammFacetAddress,
    eventName: "CoordinatorSet",
  });

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link sammFacetAbi}__ and `eventName` set to `"OwnershipTransferRequested"`
 */
export const useWatchSammFacetOwnershipTransferRequestedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: sammFacetAbi,
    address: sammFacetAddress,
    eventName: "OwnershipTransferRequested",
  });

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link sammFacetAbi}__ and `eventName` set to `"OwnershipTransferred"`
 */
export const useWatchSammFacetOwnershipTransferredEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: sammFacetAbi,
    address: sammFacetAddress,
    eventName: "OwnershipTransferred",
  });

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link sammFacetAbi}__ and `eventName` set to `"SwapCompleted"`
 */
export const useWatchSammFacetSwapCompletedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: sammFacetAbi,
    address: sammFacetAddress,
    eventName: "SwapCompleted",
  });

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link sammFacetAbi}__ and `eventName` set to `"SwapInitiated"`
 */
export const useWatchSammFacetSwapInitiatedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: sammFacetAbi,
    address: sammFacetAddress,
    eventName: "SwapInitiated",
  });
