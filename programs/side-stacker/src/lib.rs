use anchor_lang::prelude::*;

declare_id!("EqZTXLmsXwz4gAqBQJG2q1fXigJxVUWt2vSGH1dSRF81");

#[program]
pub mod side_stacker {
    use super::*;

    pub fn create_game(ctx: Context<CreateGame>, name: String, players: Vec<Pubkey>) -> Result<()> {
        let game = &mut ctx.accounts.game;
        game.board = vec![Play::Empty; 49];
        game.name = name;
        game.players = players;
        
        Ok(())
    }
}


#[derive(Accounts)]
#[instruction(name: String)]
pub struct CreateGame<'info> {
    #[account(
        init,
        payer = payer,
        space = 900,
        seeds = [b"game".as_ref(), name.as_ref()],
        bump
    )]
    pub game: Account<'info, Game>,
    /// CHECK:
    #[account(mut)]
    pub payer: AccountInfo<'info>,
    pub system_program: Program<'info, System>,
}

#[account]
pub struct Game {
    pub name: String,
    pub board: Vec<Play>,
    pub players: Vec<Pubkey>,
    pub turn: u8,
}
#[derive(Debug, Clone, AnchorSerialize, AnchorDeserialize)]
pub enum Play {
    Empty,
    X,
    O
}