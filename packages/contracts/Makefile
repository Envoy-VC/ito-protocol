# Load environment variables (e.g., RPC urls, keys)
-include .env

TEST_ARGS=
DEPLOY_ARGS=
ACCOUNT_NAME=deployWallet

# Default target
.DEFAULT_GOAL := help
#######################
### Core Operations ###
#######################

# Clean and build
build:
	@echo "🔨 Compiling contracts..."
	forge build

# Run all tests (unit + fuzz + invariant)
test:
	@echo "🧪 Running all tests..."
	forge test -vv $(TEST_ARGS)

# Run only fuzz tests
fuzz:
	@echo "🎲 Fuzz & invariant tests..."
	forge test --match-path "test/fuzz/*" -vv $(TEST_ARGS)

# Run tests against a mainnet fork for on-chain integration
test-fork:
	@echo "🌐 Testing on a mainnet fork..."
	forge test --fork-url $(MAINNET_RPC_URL) --fork-block-number $(FORK_BLOCK) -vv

# Format & lint
fmt:
	@echo "🧹 Formatting code..."
	forge fmt

analyze:
	@echo "🔍 Analyzing code..."
	slither .

#########################
### Deployment Options###
#########################

# Default deploy (anvil or testnet/mainnet via ARGS)
deploy:
	@echo "🚀 Deploying"
	forge script script/Deploy.s.sol:Deploy --broadcast $(DEPLOY_ARGS)

deploy-anvil:
	@echo "🚀 Deploying to local anvil..."
	forge script script/Deploy.s.sol:Deploy --rpc-url http://127.0.0.1:8545 --broadcast

deploy-citrea:
	@echo "🚀 Deploying to Citrea Testnet..."
	forge script script/Deploy.s.sol:DeployScript --rpc-url https://rpc.testnet.citrea.xyz --account $(ACCOUNT_NAME) --broadcast --verify --verifier blockscout --verifier-url https://explorer.testnet.citrea.xyz/api/ -vvvv

###################
### Diagnostics ###
###################

gas-report:
	@echo "💰 Generating gas usage report..."
	forge test --gas-report

clean:
	@echo "🧼 Cleaning generated files..."
	forge clean
	rm -rf out cache

###################
### Help Section ###
###################
help:
	@echo "Usage:"
	@echo "  make build             - Compile contracts"
	@echo "  make test              - Run full test suite"
	@echo "  make fuzz              - Run fuzz tests"
	@echo "  make test-fork         - Run tests on mainnet fork"
	@echo "  make fmt               - Format code"
	@echo "  make analyze           - Run static analysis"
	@echo "  make deploy            - Deploy with args"
	@echo "  make deploy-anvil      - Deploy locally"
	@echo "  make deploy-citrea     - Deploy to Citrea testnet"
	@echo "  make gas-report        - Capture gas costs"
	@echo "  make clean             - Clean build artifacts"

.PHONY: build test fuzz fork fmt lint deploy deploy-anvil deploy-sepolia deploy-mainnet gas-report clean help
