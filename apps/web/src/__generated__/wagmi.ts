import {
	createUseReadContract,
	createUseSimulateContract,
	createUseWatchContractEvent,
	createUseWriteContract,
} from "wagmi/codegen";

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// ItoProxy
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const itoProxyAbi = [
	{
		inputs: [
			{ internalType: "address", name: "_contractOwner", type: "address" },
			{ internalType: "address", name: "_diamondCutFacet", type: "address" },
			{ internalType: "address", name: "_ownershipFacet", type: "address" },
		],
		stateMutability: "payable",
		type: "constructor",
	},
	{ stateMutability: "payable", type: "fallback" },
	{ stateMutability: "payable", type: "receive" },
	{ inputs: [], name: "AlreadyInitialized", type: "error" },
	{
		inputs: [
			{
				internalType: "address",
				name: "_initializationContractAddress",
				type: "address",
			},
			{ internalType: "bytes", name: "_calldata", type: "bytes" },
		],
		name: "InitializationFunctionReverted",
		type: "error",
	},
] as const;

export const itoProxyAddress =
	"0x90d7F4E09415FCC36fF860e56e40330B09E2dBD8" as const;

export const itoProxyConfig = {
	abi: itoProxyAbi,
	address: itoProxyAddress,
} as const;

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// ItoToken
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const itoTokenAbi = [
	{
		inputs: [
			{ internalType: "address", name: "initialOwner", type: "address" },
		],
		stateMutability: "nonpayable",
		type: "constructor",
	},
	{
		inputs: [],
		name: "DOMAIN_SEPARATOR",
		outputs: [{ internalType: "bytes32", name: "", type: "bytes32" }],
		stateMutability: "view",
		type: "function",
	},
	{
		inputs: [
			{ internalType: "address", name: "owner", type: "address" },
			{ internalType: "address", name: "spender", type: "address" },
		],
		name: "allowance",
		outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
		stateMutability: "view",
		type: "function",
	},
	{
		inputs: [
			{ internalType: "address", name: "spender", type: "address" },
			{ internalType: "uint256", name: "value", type: "uint256" },
		],
		name: "approve",
		outputs: [{ internalType: "bool", name: "", type: "bool" }],
		stateMutability: "nonpayable",
		type: "function",
	},
	{
		inputs: [{ internalType: "address", name: "account", type: "address" }],
		name: "balanceOf",
		outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
		stateMutability: "view",
		type: "function",
	},
	{
		inputs: [{ internalType: "uint256", name: "value", type: "uint256" }],
		name: "burn",
		outputs: [],
		stateMutability: "nonpayable",
		type: "function",
	},
	{
		inputs: [
			{ internalType: "address", name: "account", type: "address" },
			{ internalType: "uint256", name: "value", type: "uint256" },
		],
		name: "burnFrom",
		outputs: [],
		stateMutability: "nonpayable",
		type: "function",
	},
	{
		inputs: [],
		name: "decimals",
		outputs: [{ internalType: "uint8", name: "", type: "uint8" }],
		stateMutability: "view",
		type: "function",
	},
	{
		inputs: [],
		name: "eip712Domain",
		outputs: [
			{ internalType: "bytes1", name: "fields", type: "bytes1" },
			{ internalType: "string", name: "name", type: "string" },
			{ internalType: "string", name: "version", type: "string" },
			{ internalType: "uint256", name: "chainId", type: "uint256" },
			{ internalType: "address", name: "verifyingContract", type: "address" },
			{ internalType: "bytes32", name: "salt", type: "bytes32" },
			{ internalType: "uint256[]", name: "extensions", type: "uint256[]" },
		],
		stateMutability: "view",
		type: "function",
	},
	{
		inputs: [
			{ internalType: "address", name: "to", type: "address" },
			{ internalType: "uint256", name: "amount", type: "uint256" },
		],
		name: "mint",
		outputs: [],
		stateMutability: "nonpayable",
		type: "function",
	},
	{
		inputs: [],
		name: "name",
		outputs: [{ internalType: "string", name: "", type: "string" }],
		stateMutability: "view",
		type: "function",
	},
	{
		inputs: [{ internalType: "address", name: "owner", type: "address" }],
		name: "nonces",
		outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
		stateMutability: "view",
		type: "function",
	},
	{
		inputs: [],
		name: "owner",
		outputs: [{ internalType: "address", name: "", type: "address" }],
		stateMutability: "view",
		type: "function",
	},
	{
		inputs: [
			{ internalType: "address", name: "owner", type: "address" },
			{ internalType: "address", name: "spender", type: "address" },
			{ internalType: "uint256", name: "value", type: "uint256" },
			{ internalType: "uint256", name: "deadline", type: "uint256" },
			{ internalType: "uint8", name: "v", type: "uint8" },
			{ internalType: "bytes32", name: "r", type: "bytes32" },
			{ internalType: "bytes32", name: "s", type: "bytes32" },
		],
		name: "permit",
		outputs: [],
		stateMutability: "nonpayable",
		type: "function",
	},
	{
		inputs: [],
		name: "renounceOwnership",
		outputs: [],
		stateMutability: "nonpayable",
		type: "function",
	},
	{
		inputs: [],
		name: "symbol",
		outputs: [{ internalType: "string", name: "", type: "string" }],
		stateMutability: "view",
		type: "function",
	},
	{
		inputs: [],
		name: "totalSupply",
		outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
		stateMutability: "view",
		type: "function",
	},
	{
		inputs: [
			{ internalType: "address", name: "to", type: "address" },
			{ internalType: "uint256", name: "value", type: "uint256" },
		],
		name: "transfer",
		outputs: [{ internalType: "bool", name: "", type: "bool" }],
		stateMutability: "nonpayable",
		type: "function",
	},
	{
		inputs: [
			{ internalType: "address", name: "from", type: "address" },
			{ internalType: "address", name: "to", type: "address" },
			{ internalType: "uint256", name: "value", type: "uint256" },
		],
		name: "transferFrom",
		outputs: [{ internalType: "bool", name: "", type: "bool" }],
		stateMutability: "nonpayable",
		type: "function",
	},
	{
		inputs: [{ internalType: "address", name: "newOwner", type: "address" }],
		name: "transferOwnership",
		outputs: [],
		stateMutability: "nonpayable",
		type: "function",
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				internalType: "address",
				name: "owner",
				type: "address",
			},
			{
				indexed: true,
				internalType: "address",
				name: "spender",
				type: "address",
			},
			{
				indexed: false,
				internalType: "uint256",
				name: "value",
				type: "uint256",
			},
		],
		name: "Approval",
		type: "event",
	},
	{ anonymous: false, inputs: [], name: "EIP712DomainChanged", type: "event" },
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				internalType: "address",
				name: "previousOwner",
				type: "address",
			},
			{
				indexed: true,
				internalType: "address",
				name: "newOwner",
				type: "address",
			},
		],
		name: "OwnershipTransferred",
		type: "event",
	},
	{
		anonymous: false,
		inputs: [
			{ indexed: true, internalType: "address", name: "from", type: "address" },
			{ indexed: true, internalType: "address", name: "to", type: "address" },
			{
				indexed: false,
				internalType: "uint256",
				name: "value",
				type: "uint256",
			},
		],
		name: "Transfer",
		type: "event",
	},
	{ inputs: [], name: "ECDSAInvalidSignature", type: "error" },
	{
		inputs: [{ internalType: "uint256", name: "length", type: "uint256" }],
		name: "ECDSAInvalidSignatureLength",
		type: "error",
	},
	{
		inputs: [{ internalType: "bytes32", name: "s", type: "bytes32" }],
		name: "ECDSAInvalidSignatureS",
		type: "error",
	},
	{
		inputs: [
			{ internalType: "address", name: "spender", type: "address" },
			{ internalType: "uint256", name: "allowance", type: "uint256" },
			{ internalType: "uint256", name: "needed", type: "uint256" },
		],
		name: "ERC20InsufficientAllowance",
		type: "error",
	},
	{
		inputs: [
			{ internalType: "address", name: "sender", type: "address" },
			{ internalType: "uint256", name: "balance", type: "uint256" },
			{ internalType: "uint256", name: "needed", type: "uint256" },
		],
		name: "ERC20InsufficientBalance",
		type: "error",
	},
	{
		inputs: [{ internalType: "address", name: "approver", type: "address" }],
		name: "ERC20InvalidApprover",
		type: "error",
	},
	{
		inputs: [{ internalType: "address", name: "receiver", type: "address" }],
		name: "ERC20InvalidReceiver",
		type: "error",
	},
	{
		inputs: [{ internalType: "address", name: "sender", type: "address" }],
		name: "ERC20InvalidSender",
		type: "error",
	},
	{
		inputs: [{ internalType: "address", name: "spender", type: "address" }],
		name: "ERC20InvalidSpender",
		type: "error",
	},
	{
		inputs: [{ internalType: "uint256", name: "deadline", type: "uint256" }],
		name: "ERC2612ExpiredSignature",
		type: "error",
	},
	{
		inputs: [
			{ internalType: "address", name: "signer", type: "address" },
			{ internalType: "address", name: "owner", type: "address" },
		],
		name: "ERC2612InvalidSigner",
		type: "error",
	},
	{
		inputs: [
			{ internalType: "address", name: "account", type: "address" },
			{ internalType: "uint256", name: "currentNonce", type: "uint256" },
		],
		name: "InvalidAccountNonce",
		type: "error",
	},
	{ inputs: [], name: "InvalidShortString", type: "error" },
	{
		inputs: [{ internalType: "address", name: "owner", type: "address" }],
		name: "OwnableInvalidOwner",
		type: "error",
	},
	{
		inputs: [{ internalType: "address", name: "account", type: "address" }],
		name: "OwnableUnauthorizedAccount",
		type: "error",
	},
	{
		inputs: [{ internalType: "string", name: "str", type: "string" }],
		name: "StringTooLong",
		type: "error",
	},
] as const;

export const itoTokenAddress =
	"0x724a39308024ECc6f78121113F14a07383522E8F" as const;

export const itoTokenConfig = {
	abi: itoTokenAbi,
	address: itoTokenAddress,
} as const;

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// LiquidityFacet
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const liquidityFacetAbi = [
	{
		inputs: [
			{ internalType: "bytes8", name: "poolId", type: "bytes8" },
			{ internalType: "address", name: "user", type: "address" },
		],
		name: "_claimRewards",
		outputs: [],
		stateMutability: "nonpayable",
		type: "function",
	},
	{
		inputs: [
			{ internalType: "bytes8", name: "poolId", type: "bytes8" },
			{ internalType: "address", name: "tokenIn", type: "address" },
			{ internalType: "uint256", name: "amountIn", type: "uint256" },
			{ internalType: "address", name: "tokenOut", type: "address" },
			{ internalType: "uint256", name: "amountOut", type: "uint256" },
			{ internalType: "address", name: "user", type: "address" },
		],
		name: "_updatePoolAndTransferAfterSwap",
		outputs: [],
		stateMutability: "nonpayable",
		type: "function",
	},
	{
		inputs: [
			{ internalType: "bytes8", name: "poolId", type: "bytes8" },
			{ internalType: "uint256", name: "amountADesired", type: "uint256" },
			{ internalType: "uint256", name: "amountBDesired", type: "uint256" },
		],
		name: "addLiquidity",
		outputs: [
			{ internalType: "uint256", name: "amountA", type: "uint256" },
			{ internalType: "uint256", name: "amountB", type: "uint256" },
			{ internalType: "uint256", name: "liquidity", type: "uint256" },
		],
		stateMutability: "nonpayable",
		type: "function",
	},
	{
		inputs: [
			{ internalType: "address", name: "tokenA", type: "address" },
			{ internalType: "address", name: "tokenB", type: "address" },
			{ internalType: "uint256", name: "baseRewardRate", type: "uint256" },
		],
		name: "createPool",
		outputs: [{ internalType: "bytes8", name: "", type: "bytes8" }],
		stateMutability: "nonpayable",
		type: "function",
	},
	{
		inputs: [
			{ internalType: "bytes8", name: "poolId", type: "bytes8" },
			{ internalType: "uint256", name: "amount", type: "uint256" },
			{ internalType: "uint256", name: "distributionPeriod", type: "uint256" },
		],
		name: "fundRewards",
		outputs: [],
		stateMutability: "nonpayable",
		type: "function",
	},
	{
		inputs: [{ internalType: "bytes8", name: "poolId", type: "bytes8" }],
		name: "getPoolConfig",
		outputs: [
			{
				components: [
					{ internalType: "address", name: "tokenA", type: "address" },
					{ internalType: "address", name: "tokenB", type: "address" },
					{ internalType: "uint256", name: "baseRewardRate", type: "uint256" },
					{ internalType: "uint8", name: "version", type: "uint8" },
				],
				internalType: "struct LiquidityStorageLib.PoolConfig",
				name: "poolConfig",
				type: "tuple",
			},
		],
		stateMutability: "view",
		type: "function",
	},
	{
		inputs: [{ internalType: "bytes8", name: "poolId", type: "bytes8" }],
		name: "getPoolState",
		outputs: [
			{
				components: [
					{ internalType: "uint256", name: "reserveA", type: "uint256" },
					{ internalType: "uint256", name: "reserveB", type: "uint256" },
					{ internalType: "uint256", name: "totalLPTokens", type: "uint256" },
					{ internalType: "uint256", name: "lastUpdate", type: "uint256" },
					{
						internalType: "uint256",
						name: "accRewardPerShare",
						type: "uint256",
					},
				],
				internalType: "struct LiquidityStorageLib.PoolState",
				name: "poolState",
				type: "tuple",
			},
		],
		stateMutability: "view",
		type: "function",
	},
	{
		inputs: [
			{ internalType: "address", name: "user", type: "address" },
			{ internalType: "bytes8", name: "poolId", type: "bytes8" },
		],
		name: "getUserPosition",
		outputs: [
			{
				components: [
					{ internalType: "uint256", name: "lpTokens", type: "uint256" },
					{ internalType: "uint256", name: "rewardDebt", type: "uint256" },
					{ internalType: "uint256", name: "lastInteraction", type: "uint256" },
				],
				internalType: "struct LiquidityStorageLib.UserPosition",
				name: "",
				type: "tuple",
			},
		],
		stateMutability: "view",
		type: "function",
	},
	{
		inputs: [
			{ internalType: "bytes8", name: "poolId", type: "bytes8" },
			{ internalType: "address", name: "user", type: "address" },
		],
		name: "pendingRewards",
		outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
		stateMutability: "view",
		type: "function",
	},
	{
		inputs: [{ internalType: "bytes8", name: "poolId", type: "bytes8" }],
		name: "poolExists",
		outputs: [],
		stateMutability: "view",
		type: "function",
	},
	{
		inputs: [
			{ internalType: "bytes8", name: "poolId", type: "bytes8" },
			{ internalType: "uint256", name: "liquidity", type: "uint256" },
		],
		name: "removeLiquidity",
		outputs: [],
		stateMutability: "nonpayable",
		type: "function",
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				internalType: "address",
				name: "provider",
				type: "address",
			},
			{ indexed: true, internalType: "bytes8", name: "poolId", type: "bytes8" },
			{
				indexed: false,
				internalType: "uint256",
				name: "amountA",
				type: "uint256",
			},
			{
				indexed: false,
				internalType: "uint256",
				name: "amountB",
				type: "uint256",
			},
			{
				indexed: false,
				internalType: "uint256",
				name: "liquidity",
				type: "uint256",
			},
		],
		name: "LiquidityAdded",
		type: "event",
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				internalType: "address",
				name: "provider",
				type: "address",
			},
			{ indexed: true, internalType: "bytes8", name: "poolId", type: "bytes8" },
			{
				indexed: false,
				internalType: "uint256",
				name: "amountA",
				type: "uint256",
			},
			{
				indexed: false,
				internalType: "uint256",
				name: "amountB",
				type: "uint256",
			},
			{
				indexed: false,
				internalType: "uint256",
				name: "liquidity",
				type: "uint256",
			},
		],
		name: "LiquidityRemoved",
		type: "event",
	},
	{
		anonymous: false,
		inputs: [
			{ indexed: true, internalType: "bytes8", name: "poolId", type: "bytes8" },
			{
				indexed: false,
				internalType: "address",
				name: "tokenA",
				type: "address",
			},
			{
				indexed: false,
				internalType: "address",
				name: "tokenB",
				type: "address",
			},
		],
		name: "PoolCreated",
		type: "event",
	},
	{
		anonymous: false,
		inputs: [
			{ indexed: true, internalType: "address", name: "user", type: "address" },
			{ indexed: true, internalType: "bytes8", name: "poolId", type: "bytes8" },
			{
				indexed: false,
				internalType: "uint256",
				name: "amount",
				type: "uint256",
			},
		],
		name: "RewardsClaimed",
		type: "event",
	},
	{
		inputs: [{ internalType: "address", name: "token", type: "address" }],
		name: "DuplicateToken",
		type: "error",
	},
	{
		inputs: [{ internalType: "address", name: "token", type: "address" }],
		name: "InsufficientAmount",
		type: "error",
	},
	{ inputs: [], name: "InsufficientLiquidity", type: "error" },
	{
		inputs: [{ internalType: "address", name: "token", type: "address" }],
		name: "InsufficientReserves",
		type: "error",
	},
	{
		inputs: [{ internalType: "bytes8", name: "poolId", type: "bytes8" }],
		name: "PoolAlreadyExists",
		type: "error",
	},
	{
		inputs: [{ internalType: "bytes8", name: "poolId", type: "bytes8" }],
		name: "PoolNotFound",
		type: "error",
	},
	{ inputs: [], name: "ReentrancyGuardReentrantCall", type: "error" },
	{
		inputs: [{ internalType: "address", name: "token", type: "address" }],
		name: "SafeERC20FailedOperation",
		type: "error",
	},
	{ inputs: [], name: "ZeroAddress", type: "error" },
] as const;

export const liquidityFacetAddress =
	"0x90d7F4E09415FCC36fF860e56e40330B09E2dBD8" as const;

export const liquidityFacetConfig = {
	abi: liquidityFacetAbi,
	address: liquidityFacetAddress,
} as const;

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// MockETH
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const mockEthAbi = [
	{
		inputs: [
			{ internalType: "address", name: "initialOwner", type: "address" },
		],
		stateMutability: "nonpayable",
		type: "constructor",
	},
	{
		inputs: [],
		name: "DOMAIN_SEPARATOR",
		outputs: [{ internalType: "bytes32", name: "", type: "bytes32" }],
		stateMutability: "view",
		type: "function",
	},
	{
		inputs: [
			{ internalType: "address", name: "owner", type: "address" },
			{ internalType: "address", name: "spender", type: "address" },
		],
		name: "allowance",
		outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
		stateMutability: "view",
		type: "function",
	},
	{
		inputs: [
			{ internalType: "address", name: "spender", type: "address" },
			{ internalType: "uint256", name: "value", type: "uint256" },
		],
		name: "approve",
		outputs: [{ internalType: "bool", name: "", type: "bool" }],
		stateMutability: "nonpayable",
		type: "function",
	},
	{
		inputs: [{ internalType: "address", name: "account", type: "address" }],
		name: "balanceOf",
		outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
		stateMutability: "view",
		type: "function",
	},
	{
		inputs: [{ internalType: "uint256", name: "value", type: "uint256" }],
		name: "burn",
		outputs: [],
		stateMutability: "nonpayable",
		type: "function",
	},
	{
		inputs: [
			{ internalType: "address", name: "account", type: "address" },
			{ internalType: "uint256", name: "value", type: "uint256" },
		],
		name: "burnFrom",
		outputs: [],
		stateMutability: "nonpayable",
		type: "function",
	},
	{
		inputs: [],
		name: "decimals",
		outputs: [{ internalType: "uint8", name: "", type: "uint8" }],
		stateMutability: "view",
		type: "function",
	},
	{
		inputs: [],
		name: "eip712Domain",
		outputs: [
			{ internalType: "bytes1", name: "fields", type: "bytes1" },
			{ internalType: "string", name: "name", type: "string" },
			{ internalType: "string", name: "version", type: "string" },
			{ internalType: "uint256", name: "chainId", type: "uint256" },
			{ internalType: "address", name: "verifyingContract", type: "address" },
			{ internalType: "bytes32", name: "salt", type: "bytes32" },
			{ internalType: "uint256[]", name: "extensions", type: "uint256[]" },
		],
		stateMutability: "view",
		type: "function",
	},
	{
		inputs: [
			{ internalType: "address", name: "to", type: "address" },
			{ internalType: "uint256", name: "amount", type: "uint256" },
		],
		name: "mint",
		outputs: [],
		stateMutability: "nonpayable",
		type: "function",
	},
	{
		inputs: [],
		name: "name",
		outputs: [{ internalType: "string", name: "", type: "string" }],
		stateMutability: "view",
		type: "function",
	},
	{
		inputs: [{ internalType: "address", name: "owner", type: "address" }],
		name: "nonces",
		outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
		stateMutability: "view",
		type: "function",
	},
	{
		inputs: [],
		name: "owner",
		outputs: [{ internalType: "address", name: "", type: "address" }],
		stateMutability: "view",
		type: "function",
	},
	{
		inputs: [
			{ internalType: "address", name: "owner", type: "address" },
			{ internalType: "address", name: "spender", type: "address" },
			{ internalType: "uint256", name: "value", type: "uint256" },
			{ internalType: "uint256", name: "deadline", type: "uint256" },
			{ internalType: "uint8", name: "v", type: "uint8" },
			{ internalType: "bytes32", name: "r", type: "bytes32" },
			{ internalType: "bytes32", name: "s", type: "bytes32" },
		],
		name: "permit",
		outputs: [],
		stateMutability: "nonpayable",
		type: "function",
	},
	{
		inputs: [],
		name: "renounceOwnership",
		outputs: [],
		stateMutability: "nonpayable",
		type: "function",
	},
	{
		inputs: [],
		name: "symbol",
		outputs: [{ internalType: "string", name: "", type: "string" }],
		stateMutability: "view",
		type: "function",
	},
	{
		inputs: [],
		name: "totalSupply",
		outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
		stateMutability: "view",
		type: "function",
	},
	{
		inputs: [
			{ internalType: "address", name: "to", type: "address" },
			{ internalType: "uint256", name: "value", type: "uint256" },
		],
		name: "transfer",
		outputs: [{ internalType: "bool", name: "", type: "bool" }],
		stateMutability: "nonpayable",
		type: "function",
	},
	{
		inputs: [
			{ internalType: "address", name: "from", type: "address" },
			{ internalType: "address", name: "to", type: "address" },
			{ internalType: "uint256", name: "value", type: "uint256" },
		],
		name: "transferFrom",
		outputs: [{ internalType: "bool", name: "", type: "bool" }],
		stateMutability: "nonpayable",
		type: "function",
	},
	{
		inputs: [{ internalType: "address", name: "newOwner", type: "address" }],
		name: "transferOwnership",
		outputs: [],
		stateMutability: "nonpayable",
		type: "function",
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				internalType: "address",
				name: "owner",
				type: "address",
			},
			{
				indexed: true,
				internalType: "address",
				name: "spender",
				type: "address",
			},
			{
				indexed: false,
				internalType: "uint256",
				name: "value",
				type: "uint256",
			},
		],
		name: "Approval",
		type: "event",
	},
	{ anonymous: false, inputs: [], name: "EIP712DomainChanged", type: "event" },
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				internalType: "address",
				name: "previousOwner",
				type: "address",
			},
			{
				indexed: true,
				internalType: "address",
				name: "newOwner",
				type: "address",
			},
		],
		name: "OwnershipTransferred",
		type: "event",
	},
	{
		anonymous: false,
		inputs: [
			{ indexed: true, internalType: "address", name: "from", type: "address" },
			{ indexed: true, internalType: "address", name: "to", type: "address" },
			{
				indexed: false,
				internalType: "uint256",
				name: "value",
				type: "uint256",
			},
		],
		name: "Transfer",
		type: "event",
	},
	{ inputs: [], name: "ECDSAInvalidSignature", type: "error" },
	{
		inputs: [{ internalType: "uint256", name: "length", type: "uint256" }],
		name: "ECDSAInvalidSignatureLength",
		type: "error",
	},
	{
		inputs: [{ internalType: "bytes32", name: "s", type: "bytes32" }],
		name: "ECDSAInvalidSignatureS",
		type: "error",
	},
	{
		inputs: [
			{ internalType: "address", name: "spender", type: "address" },
			{ internalType: "uint256", name: "allowance", type: "uint256" },
			{ internalType: "uint256", name: "needed", type: "uint256" },
		],
		name: "ERC20InsufficientAllowance",
		type: "error",
	},
	{
		inputs: [
			{ internalType: "address", name: "sender", type: "address" },
			{ internalType: "uint256", name: "balance", type: "uint256" },
			{ internalType: "uint256", name: "needed", type: "uint256" },
		],
		name: "ERC20InsufficientBalance",
		type: "error",
	},
	{
		inputs: [{ internalType: "address", name: "approver", type: "address" }],
		name: "ERC20InvalidApprover",
		type: "error",
	},
	{
		inputs: [{ internalType: "address", name: "receiver", type: "address" }],
		name: "ERC20InvalidReceiver",
		type: "error",
	},
	{
		inputs: [{ internalType: "address", name: "sender", type: "address" }],
		name: "ERC20InvalidSender",
		type: "error",
	},
	{
		inputs: [{ internalType: "address", name: "spender", type: "address" }],
		name: "ERC20InvalidSpender",
		type: "error",
	},
	{
		inputs: [{ internalType: "uint256", name: "deadline", type: "uint256" }],
		name: "ERC2612ExpiredSignature",
		type: "error",
	},
	{
		inputs: [
			{ internalType: "address", name: "signer", type: "address" },
			{ internalType: "address", name: "owner", type: "address" },
		],
		name: "ERC2612InvalidSigner",
		type: "error",
	},
	{
		inputs: [
			{ internalType: "address", name: "account", type: "address" },
			{ internalType: "uint256", name: "currentNonce", type: "uint256" },
		],
		name: "InvalidAccountNonce",
		type: "error",
	},
	{ inputs: [], name: "InvalidShortString", type: "error" },
	{
		inputs: [{ internalType: "address", name: "owner", type: "address" }],
		name: "OwnableInvalidOwner",
		type: "error",
	},
	{
		inputs: [{ internalType: "address", name: "account", type: "address" }],
		name: "OwnableUnauthorizedAccount",
		type: "error",
	},
	{
		inputs: [{ internalType: "string", name: "str", type: "string" }],
		name: "StringTooLong",
		type: "error",
	},
] as const;

export const mockEthAddress =
	"0xD57622C4fa83ff905c3759cE43F4a0E34f812470" as const;

export const mockEthConfig = {
	abi: mockEthAbi,
	address: mockEthAddress,
} as const;

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// MockUSD
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const mockUsdAbi = [
	{
		inputs: [
			{ internalType: "address", name: "initialOwner", type: "address" },
		],
		stateMutability: "nonpayable",
		type: "constructor",
	},
	{
		inputs: [],
		name: "DOMAIN_SEPARATOR",
		outputs: [{ internalType: "bytes32", name: "", type: "bytes32" }],
		stateMutability: "view",
		type: "function",
	},
	{
		inputs: [
			{ internalType: "address", name: "owner", type: "address" },
			{ internalType: "address", name: "spender", type: "address" },
		],
		name: "allowance",
		outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
		stateMutability: "view",
		type: "function",
	},
	{
		inputs: [
			{ internalType: "address", name: "spender", type: "address" },
			{ internalType: "uint256", name: "value", type: "uint256" },
		],
		name: "approve",
		outputs: [{ internalType: "bool", name: "", type: "bool" }],
		stateMutability: "nonpayable",
		type: "function",
	},
	{
		inputs: [{ internalType: "address", name: "account", type: "address" }],
		name: "balanceOf",
		outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
		stateMutability: "view",
		type: "function",
	},
	{
		inputs: [{ internalType: "uint256", name: "value", type: "uint256" }],
		name: "burn",
		outputs: [],
		stateMutability: "nonpayable",
		type: "function",
	},
	{
		inputs: [
			{ internalType: "address", name: "account", type: "address" },
			{ internalType: "uint256", name: "value", type: "uint256" },
		],
		name: "burnFrom",
		outputs: [],
		stateMutability: "nonpayable",
		type: "function",
	},
	{
		inputs: [],
		name: "decimals",
		outputs: [{ internalType: "uint8", name: "", type: "uint8" }],
		stateMutability: "view",
		type: "function",
	},
	{
		inputs: [],
		name: "eip712Domain",
		outputs: [
			{ internalType: "bytes1", name: "fields", type: "bytes1" },
			{ internalType: "string", name: "name", type: "string" },
			{ internalType: "string", name: "version", type: "string" },
			{ internalType: "uint256", name: "chainId", type: "uint256" },
			{ internalType: "address", name: "verifyingContract", type: "address" },
			{ internalType: "bytes32", name: "salt", type: "bytes32" },
			{ internalType: "uint256[]", name: "extensions", type: "uint256[]" },
		],
		stateMutability: "view",
		type: "function",
	},
	{
		inputs: [
			{ internalType: "address", name: "to", type: "address" },
			{ internalType: "uint256", name: "amount", type: "uint256" },
		],
		name: "mint",
		outputs: [],
		stateMutability: "nonpayable",
		type: "function",
	},
	{
		inputs: [],
		name: "name",
		outputs: [{ internalType: "string", name: "", type: "string" }],
		stateMutability: "view",
		type: "function",
	},
	{
		inputs: [{ internalType: "address", name: "owner", type: "address" }],
		name: "nonces",
		outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
		stateMutability: "view",
		type: "function",
	},
	{
		inputs: [],
		name: "owner",
		outputs: [{ internalType: "address", name: "", type: "address" }],
		stateMutability: "view",
		type: "function",
	},
	{
		inputs: [
			{ internalType: "address", name: "owner", type: "address" },
			{ internalType: "address", name: "spender", type: "address" },
			{ internalType: "uint256", name: "value", type: "uint256" },
			{ internalType: "uint256", name: "deadline", type: "uint256" },
			{ internalType: "uint8", name: "v", type: "uint8" },
			{ internalType: "bytes32", name: "r", type: "bytes32" },
			{ internalType: "bytes32", name: "s", type: "bytes32" },
		],
		name: "permit",
		outputs: [],
		stateMutability: "nonpayable",
		type: "function",
	},
	{
		inputs: [],
		name: "renounceOwnership",
		outputs: [],
		stateMutability: "nonpayable",
		type: "function",
	},
	{
		inputs: [],
		name: "symbol",
		outputs: [{ internalType: "string", name: "", type: "string" }],
		stateMutability: "view",
		type: "function",
	},
	{
		inputs: [],
		name: "totalSupply",
		outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
		stateMutability: "view",
		type: "function",
	},
	{
		inputs: [
			{ internalType: "address", name: "to", type: "address" },
			{ internalType: "uint256", name: "value", type: "uint256" },
		],
		name: "transfer",
		outputs: [{ internalType: "bool", name: "", type: "bool" }],
		stateMutability: "nonpayable",
		type: "function",
	},
	{
		inputs: [
			{ internalType: "address", name: "from", type: "address" },
			{ internalType: "address", name: "to", type: "address" },
			{ internalType: "uint256", name: "value", type: "uint256" },
		],
		name: "transferFrom",
		outputs: [{ internalType: "bool", name: "", type: "bool" }],
		stateMutability: "nonpayable",
		type: "function",
	},
	{
		inputs: [{ internalType: "address", name: "newOwner", type: "address" }],
		name: "transferOwnership",
		outputs: [],
		stateMutability: "nonpayable",
		type: "function",
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				internalType: "address",
				name: "owner",
				type: "address",
			},
			{
				indexed: true,
				internalType: "address",
				name: "spender",
				type: "address",
			},
			{
				indexed: false,
				internalType: "uint256",
				name: "value",
				type: "uint256",
			},
		],
		name: "Approval",
		type: "event",
	},
	{ anonymous: false, inputs: [], name: "EIP712DomainChanged", type: "event" },
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				internalType: "address",
				name: "previousOwner",
				type: "address",
			},
			{
				indexed: true,
				internalType: "address",
				name: "newOwner",
				type: "address",
			},
		],
		name: "OwnershipTransferred",
		type: "event",
	},
	{
		anonymous: false,
		inputs: [
			{ indexed: true, internalType: "address", name: "from", type: "address" },
			{ indexed: true, internalType: "address", name: "to", type: "address" },
			{
				indexed: false,
				internalType: "uint256",
				name: "value",
				type: "uint256",
			},
		],
		name: "Transfer",
		type: "event",
	},
	{ inputs: [], name: "ECDSAInvalidSignature", type: "error" },
	{
		inputs: [{ internalType: "uint256", name: "length", type: "uint256" }],
		name: "ECDSAInvalidSignatureLength",
		type: "error",
	},
	{
		inputs: [{ internalType: "bytes32", name: "s", type: "bytes32" }],
		name: "ECDSAInvalidSignatureS",
		type: "error",
	},
	{
		inputs: [
			{ internalType: "address", name: "spender", type: "address" },
			{ internalType: "uint256", name: "allowance", type: "uint256" },
			{ internalType: "uint256", name: "needed", type: "uint256" },
		],
		name: "ERC20InsufficientAllowance",
		type: "error",
	},
	{
		inputs: [
			{ internalType: "address", name: "sender", type: "address" },
			{ internalType: "uint256", name: "balance", type: "uint256" },
			{ internalType: "uint256", name: "needed", type: "uint256" },
		],
		name: "ERC20InsufficientBalance",
		type: "error",
	},
	{
		inputs: [{ internalType: "address", name: "approver", type: "address" }],
		name: "ERC20InvalidApprover",
		type: "error",
	},
	{
		inputs: [{ internalType: "address", name: "receiver", type: "address" }],
		name: "ERC20InvalidReceiver",
		type: "error",
	},
	{
		inputs: [{ internalType: "address", name: "sender", type: "address" }],
		name: "ERC20InvalidSender",
		type: "error",
	},
	{
		inputs: [{ internalType: "address", name: "spender", type: "address" }],
		name: "ERC20InvalidSpender",
		type: "error",
	},
	{
		inputs: [{ internalType: "uint256", name: "deadline", type: "uint256" }],
		name: "ERC2612ExpiredSignature",
		type: "error",
	},
	{
		inputs: [
			{ internalType: "address", name: "signer", type: "address" },
			{ internalType: "address", name: "owner", type: "address" },
		],
		name: "ERC2612InvalidSigner",
		type: "error",
	},
	{
		inputs: [
			{ internalType: "address", name: "account", type: "address" },
			{ internalType: "uint256", name: "currentNonce", type: "uint256" },
		],
		name: "InvalidAccountNonce",
		type: "error",
	},
	{ inputs: [], name: "InvalidShortString", type: "error" },
	{
		inputs: [{ internalType: "address", name: "owner", type: "address" }],
		name: "OwnableInvalidOwner",
		type: "error",
	},
	{
		inputs: [{ internalType: "address", name: "account", type: "address" }],
		name: "OwnableUnauthorizedAccount",
		type: "error",
	},
	{
		inputs: [{ internalType: "string", name: "str", type: "string" }],
		name: "StringTooLong",
		type: "error",
	},
] as const;

export const mockUsdAddress =
	"0x8B2421509a49bAC33A3c19133F60B3187Da34514" as const;

export const mockUsdConfig = {
	abi: mockUsdAbi,
	address: mockUsdAddress,
} as const;

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// OracleFacet
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const oracleFacetAbi = [
	{
		inputs: [
			{ internalType: "bytes8", name: "poolId", type: "bytes8" },
			{ internalType: "address", name: "priceFeed", type: "address" },
			{ internalType: "address", name: "volatilityFeed", type: "address" },
		],
		name: "addFeed",
		outputs: [],
		stateMutability: "nonpayable",
		type: "function",
	},
	{
		inputs: [{ internalType: "bytes8", name: "poolId", type: "bytes8" }],
		name: "getLatestPrice",
		outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
		stateMutability: "view",
		type: "function",
	},
	{
		inputs: [{ internalType: "bytes8", name: "poolId", type: "bytes8" }],
		name: "getLatestVolatility",
		outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
		stateMutability: "view",
		type: "function",
	},
	{ inputs: [], name: "PriceFeedNotFound", type: "error" },
	{
		inputs: [{ internalType: "int256", name: "value", type: "int256" }],
		name: "SafeCastOverflowedIntToUint",
		type: "error",
	},
	{ inputs: [], name: "VolatilityFeedNotFound", type: "error" },
] as const;

export const oracleFacetAddress =
	"0x90d7F4E09415FCC36fF860e56e40330B09E2dBD8" as const;

export const oracleFacetConfig = {
	abi: oracleFacetAbi,
	address: oracleFacetAddress,
} as const;

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// SAMMFacet
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const sammFacetAbi = [
	{
		inputs: [
			{ internalType: "address", name: "vrfCoordinator", type: "address" },
			{ internalType: "bytes32", name: "keyHash", type: "bytes32" },
			{ internalType: "uint256", name: "subscriptionId", type: "uint256" },
		],
		stateMutability: "nonpayable",
		type: "constructor",
	},
	{
		inputs: [],
		name: "acceptOwnership",
		outputs: [],
		stateMutability: "nonpayable",
		type: "function",
	},
	{
		inputs: [],
		name: "owner",
		outputs: [{ internalType: "address", name: "", type: "address" }],
		stateMutability: "view",
		type: "function",
	},
	{
		inputs: [
			{ internalType: "uint256", name: "requestId", type: "uint256" },
			{ internalType: "uint256[]", name: "randomWords", type: "uint256[]" },
		],
		name: "rawFulfillRandomWords",
		outputs: [],
		stateMutability: "nonpayable",
		type: "function",
	},
	{
		inputs: [],
		name: "s_vrfCoordinator",
		outputs: [
			{
				internalType: "contract IVRFCoordinatorV2Plus",
				name: "",
				type: "address",
			},
		],
		stateMutability: "view",
		type: "function",
	},
	{
		inputs: [
			{ internalType: "address", name: "_vrfCoordinator", type: "address" },
		],
		name: "setCoordinator",
		outputs: [],
		stateMutability: "nonpayable",
		type: "function",
	},
	{
		inputs: [
			{ internalType: "bytes8", name: "poolId", type: "bytes8" },
			{ internalType: "address", name: "tokenIn", type: "address" },
			{ internalType: "uint256", name: "amountIn", type: "uint256" },
		],
		name: "swap",
		outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
		stateMutability: "nonpayable",
		type: "function",
	},
	{
		inputs: [{ internalType: "address", name: "to", type: "address" }],
		name: "transferOwnership",
		outputs: [],
		stateMutability: "nonpayable",
		type: "function",
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: false,
				internalType: "address",
				name: "vrfCoordinator",
				type: "address",
			},
		],
		name: "CoordinatorSet",
		type: "event",
	},
	{
		anonymous: false,
		inputs: [
			{ indexed: true, internalType: "address", name: "from", type: "address" },
			{ indexed: true, internalType: "address", name: "to", type: "address" },
		],
		name: "OwnershipTransferRequested",
		type: "event",
	},
	{
		anonymous: false,
		inputs: [
			{ indexed: true, internalType: "address", name: "from", type: "address" },
			{ indexed: true, internalType: "address", name: "to", type: "address" },
		],
		name: "OwnershipTransferred",
		type: "event",
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				internalType: "uint256",
				name: "requestId",
				type: "uint256",
			},
			{
				indexed: false,
				internalType: "uint256",
				name: "amountOut",
				type: "uint256",
			},
			{
				indexed: false,
				internalType: "uint256",
				name: "feeCharged",
				type: "uint256",
			},
		],
		name: "SwapCompleted",
		type: "event",
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				internalType: "uint256",
				name: "requestId",
				type: "uint256",
			},
			{ indexed: true, internalType: "address", name: "user", type: "address" },
			{
				indexed: false,
				internalType: "address",
				name: "tokenIn",
				type: "address",
			},
			{
				indexed: false,
				internalType: "uint256",
				name: "amountIn",
				type: "uint256",
			},
		],
		name: "SwapInitiated",
		type: "event",
	},
	{
		inputs: [
			{ internalType: "address", name: "have", type: "address" },
			{ internalType: "address", name: "want", type: "address" },
		],
		name: "OnlyCoordinatorCanFulfill",
		type: "error",
	},
	{
		inputs: [
			{ internalType: "address", name: "have", type: "address" },
			{ internalType: "address", name: "owner", type: "address" },
			{ internalType: "address", name: "coordinator", type: "address" },
		],
		name: "OnlyOwnerOrCoordinator",
		type: "error",
	},
	{ inputs: [], name: "ReentrancyGuardReentrantCall", type: "error" },
	{
		inputs: [{ internalType: "address", name: "token", type: "address" }],
		name: "SafeERC20FailedOperation",
		type: "error",
	},
	{ inputs: [], name: "ZeroAddress", type: "error" },
] as const;

export const sammFacetAddress =
	"0x90d7F4E09415FCC36fF860e56e40330B09E2dBD8" as const;

export const sammFacetConfig = {
	abi: sammFacetAbi,
	address: sammFacetAddress,
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
