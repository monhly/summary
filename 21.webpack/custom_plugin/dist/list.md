# 文件名    资源大小  
main.7d79c2b49b7fd0a607e7.js    size() {
		if (this._cachedSize !== undefined) return this._cachedSize;
		if (this._cachedBuffer !== undefined) {
			return (this._cachedSize = this._cachedBuffer.length);
		}
		const source = this._getCachedSource();
		if (source !== undefined) {
			return (this._cachedSize = Buffer.byteLength(source));
		}
		return (this._cachedSize = this.original().size());
	}