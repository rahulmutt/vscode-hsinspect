import * as vscode from 'vscode';
import {
	LanguageClient,
	LanguageClientOptions,
	RevealOutputChannelOn,
	ServerOptions,
	TransportKind
  } from 'vscode-languageclient';

let client: LanguageClient;

export function activate(context: vscode.ExtensionContext) {
	const runArgs: string[] = [];
    const debugArgs: string[] = [];
	const serverPath = "hsinspect-lsp";

	const serverOptions: ServerOptions = {
		run: { command: serverPath, transport: TransportKind.stdio, args: runArgs },
		debug: { command: serverPath, transport: TransportKind.stdio, args: debugArgs }
	  };

	const clientOptions: LanguageClientOptions = {
		documentSelector: [
			{ scheme: 'file', language: 'haskell' },
		],
	};

	client = new LanguageClient(
		'hsinspect-lsp',
		'hsinspect Language Server',
		serverOptions,
		clientOptions
	);

	client.start();
}

export function deactivate(): Thenable<void> | undefined {
	if (!client) {
		return undefined;
	}
	return client.stop();
}
