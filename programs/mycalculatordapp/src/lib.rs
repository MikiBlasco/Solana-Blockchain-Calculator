use anchor_lang::prelude::*;

declare_id!("HVyejLaVJrHqWip2SssgQaGdNiAn6qkhBH8HBy5SeRnJ");

#[program]
pub mod mycalculatordapp {
    use super::*;

    pub fn initialize(_ctx: Context<Initialize>, init_message: String) -> Result<()> {
        let calculator = &mut _ctx.accounts.calculator;
        calculator.greeting = init_message;
        Ok(())
    }

    pub fn add(_ctx: Context<Addition>, num1: i64, num2: i64) -> Result<()> {
        let calculator = &mut _ctx.accounts.calculator;
        calculator.result = num1 + num2;
        Ok(())
    }

    pub fn subtract(_ctx: Context<Subtraction>, num1: i64, num2: i64) -> Result<()> {
        let calculator = &mut _ctx.accounts.calculator;
        calculator.result = num1 - num2;
        Ok(())
    }

    pub fn multiply(_ctx: Context<Multiply>, num1: i64, num2: i64) -> Result<()> {
        let calculator = &mut _ctx.accounts.calculator;
        calculator.result = num1 * num2;
        Ok(())
    }

    pub fn divide(_ctx: Context<Divide>, num1: i64, num2: i64) -> Result<()> {
        let calculator = &mut _ctx.accounts.calculator;
        calculator.result = num1 / num2;
        calculator.remainder = num1 % num2;
        Ok(())
    }

}

#[derive(Accounts)]
pub struct Initialize<'info> {
    #[account(init, payer = user, space = 264)]
    pub calculator: Account <'info, Calculator>,
    #[account(mut)]
    pub user: Signer<'info>,
    pub system_program: Program<'info, System>
}

#[derive(Accounts)]
pub struct Addition<'info> {
    #[account(mut)]
    pub calculator: Account<'info, Calculator>
}
#[derive(Accounts)]
pub struct Subtraction<'info> {
    #[account(mut)]
    pub calculator: Account<'info, Calculator>
}
#[derive(Accounts)]
pub struct Multiply<'info> {
    #[account(mut)]
    pub calculator: Account<'info, Calculator>
}
#[derive(Accounts)]
pub struct Divide<'info> {
    #[account(mut)]
    pub calculator: Account<'info, Calculator>
}


#[account]
pub struct Calculator {
    pub greeting: String,
    pub result: i64,
    pub remainder: i64
}